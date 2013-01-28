var Planet = require('./entities/planet')
var Defender = require('./entities/defender')
var AsteroidSpawner = require('./entities/asteroidspawner')
var ExplosionListener = require('./entities/explosionlistener')
var PowerupListener = require('./entities/poweruplistener')
var Hud = require('./entities/hud')
var Eventable = require('primo-events')
var _ = require('underscore')

var TinyDefender = function(engine) {
  Eventable.call(this)
  this.engine = engine
  this.engine.input.bind(engine.input.LEFT_ARROW, 'left')
  this.engine.input.bind(engine.input.RIGHT_ARROW, 'right')
  this.engine.input.bind(engine.input.LEFT_CTRL, 'fire')
  this.engine.gravity = this.gravity 
}

TinyDefender.prototype = {
  start: function() {
    var engine = this.engine
    var scene = engine.scene
      , camera = scene.camera
      , planet = scene.spawnEntity(Planet, {
          x: 0,
          y: 0,
          radius: 128
      })
      , defender = scene.spawnEntity(Defender, {
          centrex: 0,
          centrey: 0,
          radius: 160
      })
      , spawner = scene.spawnEntity(AsteroidSpawner)
      , explosions = scene.spawnEntity(ExplosionListener)
      , powerups = scene.spawnEntity(PowerupListener)
      , hud = scene.spawnEntity(Hud)

    engine.cellsize = 100
    camera.moveTo(0,0)
    camera.zoomTo(2000)
    engine.ui.show()
    scene.on('player-died', this.onPlayerDied, this)
  },
  onPlayerDied: function() {
    var game = this
    setTimeout(function() {
      game.engine.ui.clear()
      game.engine.ui.hide()
      game.raise('game-over')
      game.engine.reset()
    }, 2000)
  },
  gravity: function(entity, result) {
    var mag = Math.sqrt(entity.x*entity.x + entity.y*entity.y)
    result.x = (-entity.x / mag) * 0.2 
    result.y = (-entity.y / mag) * 0.2
  }
}
_.extend(TinyDefender.prototype, Eventable.prototype)

module.exports = TinyDefender


  
