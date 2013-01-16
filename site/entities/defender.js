var Primo = require('primo')
var Animation = require('primo/lib/components/animation')
var _ = require('underscore')

var RotateAroundPoint = function(entity, x, y, radius) {
  this.entity = entity
  this.game = entity.game
  this.x = x
  this.y = y
  this.radius = radius
  this.angle = -Math.PI/2 
  this.updateEntity()
}

RotateAroundPoint.prototype = {
  tick: function() {
    if(this.game.input.active('left'))
      this.rotate(-0.05)
    else if (this.game.input.active('right'))
      this.rotate(0.05)

  },
  updateEntity: function() {
    var x = this.x + (this.radius) * Math.cos(this.angle)
    var y = this.y + (this.radius) * Math.sin(this.angle)
    this.entity.x = x
    this.entity.y = y
    this.entity.rotation = this.angle
  },
  rotate: function(amount) {
    this.angle += amount
    this.updateEntity()
  }
}


module.exports = Primo.DefineEntity(function(id, data) {
  this.width = 20
  this.height = 10
  this.attach(new Animation(this, 'media/ship.png', 468, 320))
       .define('idle', 1.0, [0])
  this.attach(new RotateAroundPoint(this, data.centrex, data.centrey, data.radius))
})
