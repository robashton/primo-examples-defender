var util = require('primo-utils')

var HorizontalIndicator = function(game, data) {
  this.game = game
  this.left = util.valueOrDefault(data.left, 0)
  this.right = util.valueOrDefault(data.right, 0)
  this.bottom = util.valueOrDefault(data.bottom, 0)
  this.height = util.valueOrDefault(data.height, 5)
  this.colour = util.valueOrDefault(data.colour, '#FFF')
  this.length = 100
}

HorizontalIndicator.prototype = {
  updateLength: function(percent) {
    this.length = percent
  },
  render: function(context) {
    var canvas = context.canvas
      , width = canvas.width / 100
      , height = canvas.height / 100

    var x = this.left * width
      , y = canvas.height - (this.bottom + this.height) * height
      , width = canvas.width - (x + this.right*width)
      , height = height * this.height

    context.fillStyle = this.colour
    context.fillRect(x, y, width, height)
  }
}

module.exports = HorizontalIndicator
