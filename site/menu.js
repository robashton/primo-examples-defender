var menu = require('primo-menu')
var ui = require('primo-ui')
var _ = require('underscore')

var Menu = function(engine, game) {
  this.game = game
  this.engine = engine
  _.bindAll(this)
}

Menu.prototype = {
  startGame: function() {
    this.engine.menu.hide()
    this.game.start()
  },
  index: function() {
    this.engine.menu.show()
      .addOption(new ui.Label({
        text: "Play",
        x: 290,
        y: 140,
        height: 32,
        font: 'comic sans',
        colour: '#FFF'
      }), this.startGame)
      .addOption(new ui.Label({
        text: "Instructions",
        x: 290,
        y: 260,
        height: 32,
        font: 'comic sans',
        colour: '#FFF'
      }), this.instructions)
  },
  instructions: function() {
    this.engine.menu.show()
      .addOption(new ui.Label({
        text: "Back",
        x: 320,
        y: 260,
        align: 'center',
        height: 32,
        font: 'comic sans',
        colour: '#FFF'
    }), this.index)
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
  },
  gameover: function() {
    this.engine.menu.show()
      .addOption(new ui.Label({
        text: "Play again",
        x: 260,
        y: 200,
        height: 32,
        font: 'comic sans',
        colour: '#FFF'
      }), this.startGame)
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
}
module.exports = Menu
