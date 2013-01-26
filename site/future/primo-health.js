var util = require('primo-utils')
var _ = require('underscore')

var Health = function(entity, data) {
  this.max = 100
  this.amount = 100
  this.entity = entity
  this.entity.health = this
  this.entity.handle('damage', _.bind(this.damage, this))
}

Health.prototype = {
  damage: function(amount) {
    this.amount -= amount
    this.entity.raise('health-changed', this.amount)
    if(this.amount <= 0)
      this.entity.kill()
  },
  increase: function(amount) {
    this.amount += amount
    if(this.amount > this.max)
      this.amount = this.max
    this.entity.raise('health-changed', this.amount)
  }

}

module.exports = Health
