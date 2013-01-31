var Primo = require('primo')
var PrimoPhysics = require('primo-physics')
var PrimoMenu = require('primo-menu')
var PrimoUi = require('primo-ui')

var TinyDefender = require('./game')
var TinyDefenderMenu = require('./menu')
var TinyDefenderVariables = require('./variables')

var engine = Primo.Create('game')
var game = new TinyDefender(engine)
var menu = new TinyDefenderMenu(engine, game)

game.on('game-over', function(score) {
  menu.gameover(score)
})

engine.on('init', function() {
  PrimoPhysics.init(engine)
  PrimoUi.init(engine, { width: 640, height: 480 })
  PrimoMenu.init(engine)
  TinyDefenderVariables.init(engine)
  menu.index()
})
engine.start()

engine.render = function() {
  this.context.globalCompositionOperation = 'source-over';
  this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.globalCompositionOperation = 'lighter';
  this.scene.render(this.context)
  this.raise('render', this.context)
}
