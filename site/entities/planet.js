var Primo = require('primo')
var Animation = require('primo-animation')

module.exports = Primo.DefineEntity(function(id, data) {
  this.x = data.x - data.radius
  this.y = data.y - data.radius
  this.width = data.radius * 2.0
  this.height = data.radius * 2.0
  this.attach(new Animation(this, "media/largeplanet.png"))
})
