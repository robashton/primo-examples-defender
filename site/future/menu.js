var _ = require('underscore')
var MenuConfiguration = require('./menuconfiguration')

var Menu = function(engine) {
  this.engine = engine
  this.screens = {}
  this.activeScreen = null
  this.font = '48px sans-serif'
  this.defaultColour = '#F00'
  this.width = 100
  this.height = 100
  this.render = _.bind(this.render, this)
}

Menu.prototype = {
  configure: function() {
    return new MenuConfiguration(this)
  },
  show: function(screenid) {
    this.activeScreen = this.screens[screenid]
    this.engine.on('render', this.render)
    return this
  },
  hide: function() {
    this.engine.off('render', this.render)
  },
  render: function(context) {
    context.save()
    context.setTransform(1,0,0,1,0,0)
    context.scale(context.canvas.width / this.width, context.canvas.height / this.height)
    this.activeScreen.render(context)
    context.restore()
  }
}


module.exports = Menu
