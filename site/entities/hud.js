var Primo = require('primo')
var ui = require('primo-ui')

module.exports = Primo.DefineEntity(function(id, data) {
  var health = this.game.ui.add(new ui.Rect({
    x: 10,
    y: 460,
    height: 8,
    width: 620,
    colour: '#0F0'
  }))
  var energy = this.game.ui.add(new ui.Rect({
    x: 10,
    y: 470,
    height: 8,
    width: 620,
    colour: '#FF0'
  }))

  this.scene.on('health-changed', function(current, planet) {
    var max = planet.health.max
      , percentage = current / max
    health.width = 620 * percentage
  })
  this.scene.on('energy-changed', function(current, defender) {
    var maxEnergy = defender.firingControl.maxEnergy
      , percentage = current / maxEnergy
    energy.width = 620 * percentage
  })
  this.scene.on('infinite-energy-activated', function() {
    energy.colour = '#00F'
  })
  this.scene.on('infinite-energy-deactivated', function() {
    energy.colour = '#FF0'
  })
})
