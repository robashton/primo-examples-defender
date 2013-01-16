var Primo = require('primo')
var Animation = require('primo/lib/components/animation')
var _ = require('underscore')

var RotateAroundPoint = function(entity, x, y, radius) {
  this.entity = entity
  this.x = x
  this.y = y
  this.radius = radius
  this.angle = Math.PI * 3/2
  this.updateEntity()
  this.entity.handle('rotateleft', _.bind(this.rotateLeft, this))
  this.entity.handle('rotateright', _.bind(this.rotateRight, this))
}

RotateAroundPoint.prototype = {
  updateEntity: function() {
    var x = this.x + (this.radius) * Math.cos(this.angle)
    var y = this.y + (this.radius) * Math.sin(this.angle)
    this.entity.x = x
    this.entity.y = y
    
    // TODO: Rotate the starting sprite by 90 degrees clock-wise
    // so that we haven't got to do this really dumb patching
    // this.entity.rotation = angle + (Math.PI / 2)
  },
  rotateLeft: function(amount) {
    this.angle -= amount
    this.updateEntity()
  },
  rotateRight: function(amount) {
    this.angle += amount
    this.updateEntity()
  }
}

module.exports = Primo.DefineEntity(function(id, data) {
  this.width = 10
  this.height = 20
  this.attach(new Animation(this, 'media/ship.png', 320, 468))
       .define('idle', 1.0, [0])
  this.attach(new RotateAroundPoint(this, data.centrex, data.centrey, data.radius))
})
