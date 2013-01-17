var Bullet = require('../entities/bullet')

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

module.exports = FiringControl
