var Primo = require('primo')
var TimedRemoval = require('../components/timedremoval')

module.exports = Primo.DefineEntity(function(id, data) {
  var active = false
  this.attach(new TimedRemoval(this, 5))

  this.on('tick', function() {
    if(!active) {
      this.raise('infinite-energy-activated')
      active = true
    }
    var defender = this.scene.findEntityById('defender')
    defender.firingControl.modifyEnergy(10)
  })

  this.on('killed', function() {
    this.raise('infinite-energy-deactivated')
  })
})


