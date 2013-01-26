var Primo = require('primo')
var physics = require('primo-physics')
var Planet = require('./entities/planet')
var Defender = require('./entities/defender')
var AsteroidSpawner = require('./entities/asteroidspawner')
var ExplosionListener = require('./entities/explosionlistener')
var PowerupListener = require('./entities/poweruplistener')
var UI = require('./ui')
var Menu = require('./future/primo-menu')

var engine = Primo.Create('game')

function startGame() {
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
  camera.zoomTo(2000)
}

engine.render = function() {
  this.context.globalCompositionOperation = 'source-over';
  this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.globalCompositionOperation = 'lighter';
  this.scene.render(this.context)
}

var menu = Menu.define(engine)

menu.configure()
  .font('')
  .viewport(640, 480)
  .defineScreen("root", function(screen) {
    screen
      .addOption('Play', startGame, true)
      .addOption('Instructions', 'instructions')
  })
  .defineScreen("instructions", function(screen) {
    screen
      .addOption("Back", "root")
      .displayText(0, 0,  "You are defending the world, go you")
      .displayText(0, 20, "Use the arrow keys to move the defender")
      .displayText(0, 30, "Use the ctrl key to fire")
      .displayText(0, 40, "Mind you don't run out of energy though!")
  })

engine.on('init', function() {
  physics.init(engine)
  UI.init(engine)
  menu.show()
})


engine.start()
