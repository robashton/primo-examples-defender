var Primo = require('primo')
var GradientCircle = require('../components/gradientcircle')
var RigidBody = require('primo-rigidbody')
var Asteroid = require('./asteroid')

module.exports = Primo.DefineEntity(function(id, data) {
  this.width = 5
  this.height = 5
  this.attach(new GradientCircle(this, '#FFF', '#0F0', '#000'))

  this.attach(new RigidBody(this, {
    weight: Infinity,
    gravity: 0.0,
    bounce: 0.0
  }))

  var bullet = this
  this.on('collided', function(other) {
    if(other instanceof Asteroid) {
      other.kill()
      bullet.kill()
    }
  })
})

