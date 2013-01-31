var Bullet = require('../entities/bullet')

var FiringControl = function(entity) {
  this.entity = entity
  this.firingTicks = 0
  this.energy = 100
  this.maxEnergy = 100
  this.power = 1
  this.game = entity.game
  this.scene = this.game.scene
  this.variables = this.game.variables
  this.entity.firingControl = this
  this.scene.on('asteroid-destroyed', this.onAsteroidDestroyed, this)
  this.scene.on('damaged', this.onPlanetDamaged, this)
}

FiringControl.prototype = {
  tick: function() {
    this.regen()
    this.updateFiringTicks()
    if(this.energy >= this.variables.firingConsumption && this.game.input.active('fire')) 
      this.tryFire()
  },
  tryFire: function() {
    if(this.firingTicks === 0)
      this.fire()
  },
  fire: function() {
    var xcom = Math.cos(this.entity.rotation)
      , ycom = Math.sin(this.entity.rotation)
    var velx = this.variables.bulletSpeed * xcom
    var vely = this.variables.bulletSpeed * ycom
    this.scene.spawnEntity(Bullet, {
      x: this.entity.x + xcom * 10,
      y: this.entity.y + ycom * 10,
      velx: velx,
      vely: vely,
      power: this.power
    })
    this.firingTicks++
    this.modifyEnergy(-this.variables.firingConsumption)
  },
  modifyEnergy: function(amount) {
    this.energy += amount
    if(this.energy > this.maxEnergy)
      this.energy = this.maxEnergy
    if(this.energy < 0) this.energy = 0
    this.entity.raise('energy-changed', this.energy)
  },
  regen: function() {
    if(this.energy < this.maxEnergy)
      this.modifyEnergy(this.variables.firingRegen)
  },
  updateFiringTicks: function() {
    if(this.firingTicks === 0) return
    if(++this.firingTicks === this.variables.firingRate)
      this.firingTicks = 0
  },
  onAsteroidDestroyed: function() {
    this.power++
  },
  onPlanetDamaged: function() {
    this.power = 1
  }
}

module.exports = FiringControl
