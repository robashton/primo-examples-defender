var Primo = require('primo')
var Animation = require('primo-animation')
var RotateAroundPoint = require('../components/rotatearoundpoint')
var FiringControl = require('../components/firingcontrol')
var _ = require('underscore')


module.exports = Primo.DefineEntity(function(id, data) {
  this.width = 20
  this.height = 10
  this.attach(new Animation(this, 'media/ship.png', 468, 320))
       .define('idle', 1.0, [0])
  this.attach(new RotateAroundPoint(this, data.centrex, data.centrey, data.radius))
  this.attach(new FiringControl(this))
})
