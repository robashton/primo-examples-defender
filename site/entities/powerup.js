var Primo = require('primo')
var Animation = require('primo-animation')
var RigidBody = require('primo-physics').RigidBody

var Planet = require('./planet')
var DestructionField = require('./destructionfield')

module.exports = Primo.DefineEntity(function(id, data) {
  var powerup = powerups[Math.floor(Math.random() * powerups.length)]
  this.width = 50
  this.height = 50
  this.gravible = true
  this.attach(new Animation(this, powerup.texture))
  this.attach(new RigidBody(this, {
      solid: false
  }))
  this.on('collided', function(other) {
    if(other instanceof Planet) {
      powerup.invoke.call(this)
    }
  })
  this.energyFeeder = this.attach({
    active: false,
    scene: this.scene,
    entity: this,
    ticksRemaining: 0,
    tick: function() {
      if(this.active) {
        var defender = this.scene.findEntityById('defender')
        defender.firingControl.modifyEnergy(10)
        if(--this.ticksRemaining === 0)
          this.deactivate()
      }
    },
    activate: function() {
      this.entity.raise('infinite-energy-activated')
      this.ticksRemaining = 90
      this.active = true
    },
    deactivate: function() {
      this.entity.raise('infinite-energy-deactivated')
      this.active = false
      this.entity.kill()
    }
  })
})

var powerups = [
  {
    name: "energy-boost",
    texture: 'media/star.png',
    invoke: function() {
      var defender = this.scene.findEntityById('defender')
      defender.firingControl.modifyEnergy(20)
      this.kill()
    }
  },
  {
    name: "health-boost",
    texture: 'media/heart.png',
    invoke: function() {
      var planet = this.scene.findEntityById('planet')
      planet.health.increase(20)
      this.kill()
    }
  },
  {
    name: "destruction-field",
    texture: 'media/destruction.png',
    invoke: function() {
      var planet = this.scene.findEntityById('planet')
      this.scene.spawnEntity(DestructionField, {
        x: planet.x + planet.width/2,
        y: planet.y + planet.height/2
      })
      this.kill()
    }
  },
  {
    name: "infinite-energy",
    texture: 'media/infinite.png',
    invoke: function() {
      this.energyFeeder.activate()
    }
  }
]
