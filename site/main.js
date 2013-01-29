var Primo = require('primo')
var physics = require('primo-physics')
var menu = require('primo-menu')
var ui = require('primo-ui')

var TinyDefender = require('./game')

var engine = Primo.Create('game')
var game = new TinyDefender(engine)


engine.on('init', function() {
  physics.init(engine)
  ui.init(engine, { width: 640, height: 480 })
  menu.init(engine, configureMenu)
  engine.menu.show('root')
})

game.on('game-over', function() {
  menu.show('gameover')
})

engine.render = function() {
  this.context.globalCompositionOperation = 'source-over';
  this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.globalCompositionOperation = 'lighter';
  this.scene.render(this.context)
  this.raise('render', this.context)
}

engine.start()

function configureMenu(config) {
  config
    .font('50px sans-serif')
    .defaultColour('#FFF')
    .viewport(640, 480)
    .defineScreen("root", function(screen) {
      screen
        .displayText('Tiny Defender', 100, 140, '32px comic-sans', '#555')
        .addOption('Play', 100, 200, function() {
           engine.menu.hide()
           game.start()
        })
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
   .defineScreen('gameover', function(screen) {
      screen
       .displayText("Game over", 50, 50, '50px sans-serif', '#F00')
       .displayText("Thanks for playing", 50, 110, '16px sans-serif', '#FF0')
       .addOption('Play again', 100, 200, function() {
         engine.menu.hide()
         game.start()
      })
   })
 }

