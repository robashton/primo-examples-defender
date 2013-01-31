var Primo = require('primo')
var Animation = require('primo-animation')
var RigidBody = require('primo-physics').RigidBody

var Defender = require('./defender')
var Planet = require('./planet')
var DestructionField = require('./destructionfield')
var EnergyFeeder = require('./energyfeeder')

module.exports = Primo.DefineEntity(function(id, data) {
  var powerup = powerups[Math.floor(Math.random() * powerups.length)]
  this.width = 50
  this.height = 50
  this.gravible = true
  this.name = powerup.name,
  this.attach(new Animation(this, powerup.texture))
  this.attach(new RigidBody(this, {
    solid: false,
    type: "circle"
  }))
  this.on('collided', function(other) {
    if(other instanceof Defender) {
      this.raise('powerup-collected', this)
      powerup.invoke.call(this)
      this.kill()
    }
    else if(other instanceof Planet)
      this.kill()
  })
})

var powerups = [
  {
    name: "Energy boost!",
    texture: 'media/star.png',
    invoke: function() {
      var defender = this.scene.findEntityById('defender')
      defender.firingControl.modifyEnergy(20)
    }
  },
  {
    name: "Health boost!",
    texture: 'media/heart.png',
    invoke: function() {
      var planet = this.scene.findEntityById('planet')
      planet.health.increase(20)
    }
  },
  {
    name: "Destruction field!",
    texture: 'media/destruction.png',
    invoke: function() {
      var planet = this.scene.findEntityById('planet')
      this.scene.spawnEntity(DestructionField, {
        x: planet.x + planet.width/2,
        y: planet.y + planet.height/2
      })
    }
  },
  {
    name: "Energy regen!",
    texture: 'media/infinite.png',
    invoke: function() {
      this.scene.spawnEntity(EnergyFeeder)
    }
  }
]
