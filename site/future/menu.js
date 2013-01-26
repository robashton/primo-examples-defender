var _ = require('underscore')
var MenuConfiguration = require('./menuconfiguration')

var Menu = function(engine) {
  this.engine = engine
  this.screens = {}
  this.activeScreen = null
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
    this.activeScreen.render(context)
  }
}


module.exports = Menu
