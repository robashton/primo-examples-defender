var Primo = require('primo')
var Animation = require('primo-animation')
var RigidBody = require('primo-rigidbody')

module.exports = Primo.DefineEntity(function(id, data) {
  this.width = 40 + Math.random() * 50;
  this.height = this.width
  this.attach(new Animation(this, 'media/asteroid.png', 128, 128))
    .define('idle', 1.0, [0])
  this.attach(new RigidBody(this, {
    weight: 90 - (90 / this.width),
    gravity: 1.0,
    bounce: 0.5
  }))
})
