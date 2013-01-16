var Primo = require('primo')
var Animation = require('primo-animation')
var Bullet = require('./bullet')
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

var FiringControl = function(entity) {
  this.entity = entity
  this.firingTicks = 0
  this.firingRate = 10
  this.bulletSpeed = 90
  this.game = entity.game
  this.scene = this.game.scene
}

FiringControl.prototype = {
  tick: function() {
    this.updateFiringTicks()
    if(this.game.input.active('fire')) 
      this.tryFire()
  },
  tryFire: function() {
    if(this.firingTicks === 0)
      this.fire()
  },
  fire: function() {
    var xcom = Math.cos(this.entity.rotation)
      , ycom = Math.sin(this.entity.rotation)
    var velx = this.bulletSpeed * xcom
    var vely = this.bulletSpeed * ycom
    this.scene.spawnEntity(Bullet, {
      x: this.entity.x + xcom * 10,
      y: this.entity.y + ycom * 10,
      velx: velx,
      vely: vely
    })
    this.firingTicks++
  },
  updateFiringTicks: function() {
    if(this.firingTicks === 0) return
    if(++this.firingTicks === this.firingRate)
      this.firingTicks = 0
  }
}


module.exports = Primo.DefineEntity(function(id, data) {
  this.width = 20
  this.height = 10
  this.attach(new Animation(this, 'media/ship.png', 468, 320))
       .define('idle', 1.0, [0])
  this.attach(new RotateAroundPoint(this, data.centrex, data.centrey, data.radius))
  this.attach(new FiringControl(this))
})
