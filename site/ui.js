var HorizontalIndicator = require('./future/primo-horizontalindicator')

module.exports = {
  init: function(game) {
    var energy = initializeEnergyBar(game)
    var health = initializeHealthBar(game)

    // TODO: I'll have a way to do this without monkey patching
    var originalRender = game.render
    game.render = function() {
      originalRender.call(game)
      energy.render(this.context)
      health.render(this.context)
    }
  }
}

function initializeHealthBar(game) {
  var scene = game.scene
    ,  healthBar = new HorizontalIndicator(game, {
        left: 2,
        right: 2,
        bottom: 5,
        height: 2,
        colour: '#0F0'
    })
  scene.on('health-changed', function(current, world) {
    var max = world.health.max
      , percentage = current / max
    healthBar.updateLength(percentage)
  })
  return healthBar
}

function initializeEnergyBar(game) {
  var scene = game.scene
    ,  energyBar = new HorizontalIndicator(game, {
        left: 2,
        right: 2,
        bottom: 2,
        height: 2,
        colour: '#FF0'
    })

  scene.on('energy-changed', function(currentEnergy, defender) {
    var maxEnergy = defender.firingControl.maxEnergy
      , percentage = currentEnergy / maxEnergy
    energyBar.updateLength(percentage)
  })
  return energyBar
}
