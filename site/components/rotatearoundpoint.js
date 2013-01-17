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
module.exports = RotateAroundPoint
