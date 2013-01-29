var Primo = require('primo')
var physics = require('primo-physics')
var menu = require('primo-menu')
var ui = require('primo-ui')
var TinyDefender = require('./game')

var engine = Primo.Create('game')
var game = new TinyDefender(engine)

game.on('game-over', showGameover)

engine.render = function() {
  this.context.globalCompositionOperation = 'source-over';
  this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.globalCompositionOperation = 'lighter';
  this.scene.render(this.context)
  this.raise('render', this.context)
}

engine.on('init', function() {
  physics.init(engine)
  ui.init(engine, { width: 640, height: 480 })
  menu.init(engine)
  showMenu()
})

engine.start()

function startGame() {
  engine.menu.hide()
  game.start()
}

function showMenu() {
  engine.menu.show(engine.ui)
    .addOption(new ui.Label({
      text: "Play",
      x: 290,
      y: 140,
      height: 32,
      font: 'comic sans',
      colour: '#FFF'
    }), startGame)
    .addOption(new ui.Label({
      text: "Instructions",
      x: 290,
      y: 260,
      height: 32,
      font: 'comic sans',
      colour: '#FFF'
    }), showInstructions)
}

function showInstructions() {
  engine.menu.show(engine.ui)
    .addOption(new ui.Label({
      text: "Back",
      x: 320,
      y: 260,
      align: 'center',
      height: 32,
      font: 'comic sans',
      colour: '#FFF'
  }), showMenu)
  .addDisplay(new ui.Label({
      text: "You are defending the world, go you",
      x: 50,
      y: 50,
      height: 16,
      font: 'comic sans',
      colour: '#FFF'
  }))
  .addDisplay(new ui.Label({
      text: "Use the arrow keys to move the defender",
      x: 50,
      y: 70,
      height: 16,
      font: 'comic sans',
      colour: '#FFF'
  }))
  .addDisplay(new ui.Label({
      text: "Use the ctrl key to fire",
      x: 50,
      y: 90,
      height: 16,
      font: 'comic sans',
      colour: '#FFF'
  }))
  .addDisplay(new ui.Label({
      text: "Mind you don't run out of energy though!",
      x: 50,
      y: 110,
      height: 16,
      font: 'comic sans',
      colour: '#FFF'
  }))
}

function showGameover() {
  engine.menu.show(engine.ui)
    .addOption(new ui.Label({
      text: "Play again",
      x: 260,
      y: 200,
      height: 32,
      font: 'comic sans',
      colour: '#FFF'
    }), startGame)
    .addDisplay(new ui.Label({
      text: "Game over",
      x: 320,
      y: 50,
      align: 'center',
      height: 50,
      font: 'comic sans',
      colour: '#FFF'
    }))
    .addDisplay(new ui.Label({
      text: "Thanks for playing",
      x: 320,
      y: 110,
      align: 'center',
      height: 16,
      font: 'comic sans',
      colour: '#FFF'
    }))
}

