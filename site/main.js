var Primo = require('primo')
var engine = Primo.Create('game')

var Planet = require('./entities/planet')
var Defender = require('./entities/defender')
var AsteroidSpawner = require('./entities/asteroidspawner')
var ExplosionListener = require('./entities/explosionlistener')
var PowerupListener = require('./entities/poweruplistener')


engine.on('init', function() {
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
  engine.input.bind(engine.input.LEFT_ARROW, 'left')
  engine.input.bind(engine.input.RIGHT_ARROW, 'right')
  engine.input.bind(engine.input.LEFT_CTRL, 'fire')

  camera.moveTo(0,0)
  camera.zoomTo(1000)
})

engine.start()
