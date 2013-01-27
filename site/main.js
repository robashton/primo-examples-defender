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
  UI.init(engine)
  menu.hide()
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
  this.raise('render', this.context)
}

var menu = Menu.define(engine)

menu.configure()
  .font('50px sans-serif')
  .defaultColour('#FFF')
  .viewport(640, 480)
  .defineScreen("root", function(screen) {
    screen
      .displayText('Tiny Defender', 100, 140, '32px comic-sans', '#555')
      .addOption('Play', 100, 200, startGame)
      .addOption('Instructions', 100, 260, 'instructions')
  })
  .defineScreen("instructions", function(screen) {
    screen
      .addOption("Back", 100, 260, "root")
      .displayText("You are defending the world, go you", 50, 50, '16px sans-serif')
      .displayText("Use the arrow keys to move the defender", 50, 70, '16px sans-serif')
      .displayText("Use the ctrl key to fire", 50, 90, '16px sans-serif')
      .displayText("Mind you don't run out of energy though!", 50, 110, '16px sans-serif')
  })

engine.on('init', function() {
  physics.init(engine)
  menu.show('root')
})

engine.start()
