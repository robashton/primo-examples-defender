var MenuScreen = require('./menuscreen')

var MenuConfiguration = function(menu) {
  this.menu = menu
}

MenuConfiguration.prototype = {
  font: function(fontstr) {
    this.menu.font = fontstr
    return this
  },
  viewport: function(width, height) {
    this.menu.width = width
    this.menu.height = height
    return this
  },
  defineScreen: function(name, cb) {
    var screen = new MenuScreen()
    this.menu.screens[name] = screen
    var configuration = new ScreenConfiguration(screen)
    cb.call(configuration, configuration)
    return this
  }
}

var ScreenConfiguration = function(screen) {
  this.screen = screen
}

ScreenConfiguration.prototype = {
  addOption: function(text, action) {
    this.screen.options.push({
      text: text,
      action: action
    })
    return this
  },
  displayText: function(x,y, text, font, colour) {
    this.screen.artifacts.push({
      type: "text",
      text: text,
      x: x,
      y: y,
      font: font,
      colour: colour
    })
    return this
  }
}

module.exports = MenuConfiguration

