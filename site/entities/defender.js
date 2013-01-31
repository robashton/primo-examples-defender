var Primo = require('primo')
var Animation = require('primo-animation')
var RigidBody = require('primo-physics').RigidBody

var RotateAroundPoint = require('../components/rotatearoundpoint')
var FiringControl = require('../components/firingcontrol')
var _ = require('underscore')

module.exports = Primo.DefineEntity(function(id, data) {
  this.id = 'defender'
  this.width = 20
  this.height = 10
  this.attach(new RigidBody(this, { solid: false }))
  this.attach(new Animation(this, 'media/ship.png'))
  this.attach(new RotateAroundPoint(this, data.centrex, data.centrey, data.radius))
  this.attach(new FiringControl(this))
})
