var Primo = require('primo')
var Animation = require('primo-animation')
var RigidBody = require('primo-physics').RigidBody

var Planet = require('./planet')

module.exports = Primo.DefineEntity(function(id, data) {
  this.width = 40 + Math.random() * 50;
  this.height = this.width
  this.attach(new Animation(this, 'media/asteroid.png'))
  this.attach(new RigidBody(this, {
    weight: 90 - (90 / this.width),
    gravity: 1.0,
    bounce: 0.5,
    type: "circle"
  }))

  this.on('collided', function(other) {
     if(other instanceof Planet) {
       other.dispatch('damage', this)
       this.kill()
     }
  })
})

