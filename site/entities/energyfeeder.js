var Primo = require('primo')

module.exports = Primo.DefineEntity(function(id, data) {
  var active = false
    , ticksRemaining = 90

  this.on('tick', function() {
    if(!active) {
      this.raise('infinite-energy-activated')
      active = true
    }

    var defender = this.scene.findEntityById('defender')
    defender.firingControl.modifyEnergy(10)

    if(--ticksRemaining === 0) {
      this.raise('infinite-energy-deactivated')
      this.kill()
    }
  })
})


