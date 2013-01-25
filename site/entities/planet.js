var Primo = require('primo')
var Animation = require('primo-animation')
var RigidBody = require('primo-physics').RigidBody

module.exports = Primo.DefineEntity(function(id, data) {
  this.x = data.x - data.radius
  this.y = data.y - data.radius
  this.width = data.radius * 2.0
  this.height = data.radius * 2.0
  this.attach(new Animation(this, "media/largeplanet.png"))
  this.attach(new RigidBody(this, {
    weight: Infinity,
    gravity: 0,
    bounce: 0,
    type: "circle"
  }))
})
