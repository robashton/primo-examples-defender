var Primo = require('primo')
var GradientCircle = require('../components/gradientcircle')
var RigidBody = require('primo-physics').RigidBody
var Asteroid = require('./asteroid')
var TimedRemoval = require('../components/timedremoval')

module.exports = Primo.DefineEntity(function(id, data) {
  this.width = 5 + Math.min(data.power * 0.5, 10)
  this.height = 5 + Math.min(data.power * 0.5, 10)
  this.attach(new GradientCircle(this, '#FFF', '#0F0', '#000'))
  this.attach(new TimedRemoval(this, 30))

  this.attach(new RigidBody(this, {
    solid: false,
    gravity: 0.0,
    bounce: 0.0,
    type: "circle"
  }))

  var bullet = this
  this.on('collided', function(other) {
    if(other instanceof Asteroid) {
      this.raise('asteroid-destroyed', other)
      other.kill()
      bullet.kill()
    }
  })
})

