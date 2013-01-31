var Planet = require('./entities/planet')
var Defender = require('./entities/defender')
var AsteroidSpawner = require('./entities/asteroidspawner')
var ExplosionListener = require('./entities/explosionlistener')
var ScoreKeeper = require('./entities/scorekeeper')
var PowerupListener = require('./entities/poweruplistener')
var Sounds = require('./entities/audio')
var Hud = require('./entities/hud')
var Eventable = require('primo-events')
var _ = require('underscore')

var TinyDefender = function(engine) {
  Eventable.call(this)
  this.engine = engine
  this.scene = engine.scene
  this.engine.input.bind(engine.input.LEFT_ARROW, 'left')
  this.engine.input.bind(engine.input.RIGHT_ARROW, 'right')
  this.engine.input.bind(engine.input.LEFT_CTRL, 'fire')
  this.engine.gravity = this.gravity 
  this.level = 0
  this.asteroidsDestroyed = 0
}

TinyDefender.prototype = {
  start: function() {
    this.level = 0
    this.asteroidsDestroyed = 0

    var engine = this.engine
      , scene = engine.scene
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
      , scores = scene.spawnEntity(ScoreKeeper)
      , sounds = scene.spawnEntity(Sounds)

    engine.cellsize = 100
    camera.moveTo(0,0)
    camera.zoomTo(2000)
    scene.on('player-died', this.onPlayerDied, this)
    scene.on('asteroid-destroyed', this.onAsteroidDestroyed, this)
    this.changeLevel(1)
  },
  changeLevel: function(level) {
    this.level = level
    this.scene.raise('level-changed', level)
  },
  onAsteroidDestroyed: function() {
    this.asteroidsDestroyed++
    if(this.asteroidsDestroyed % 5 === 0)
      this.changeLevel(this.level+1)
  },
  onPlayerDied: function() {
    var game = this
    setTimeout(function() {
      game.engine.ui.clear()
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


  
