var Primo = require('primo')
var physics = require('primo-physics')
var Planet = require('./entities/planet')
var Defender = require('./entities/defender')
var AsteroidSpawner = require('./entities/asteroidspawner')
var ExplosionListener = require('./entities/explosionlistener')
var PowerupListener = require('./entities/poweruplistener')
var UI = require('./ui')

var engine = Primo.Create('game')

engine.render = function() {
  this.context.globalCompositionOperation = 'source-over';
  this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.globalCompositionOperation = 'lighter';
  this.scene.render(this.context)
}

engine.on('init', function() {
  physics.init(engine)
  UI.init(engine)

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

  engine.cellsize = 100
  engine.gravity = function(entity, result) {
    var mag = Math.sqrt(entity.x*entity.x + entity.y*entity.y)
    result.x = (-entity.x / mag) * 0.2 
    result.y = (-entity.y / mag) * 0.2
  }
  engine.input.bind(engine.input.LEFT_ARROW, 'left')
  engine.input.bind(engine.input.RIGHT_ARROW, 'right')
  engine.input.bind(engine.input.LEFT_CTRL, 'fire')

  camera.moveTo(0,0)
  camera.zoomTo(1000)
})



engine.start()
