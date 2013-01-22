var Primo = require('primo')
var Planet = require('./planet')
var Animation = require('primo-animation')

module.exports = Primo.DefineEntity(function(id, data) {
  var powerup = powerups[Math.floor(Math.random() * powerups.length)]
  this.width = 10
  this.height = 10
  this.attach(new Animation(this, powerup.texture, 128, 128))
    .define('idle', 1.0, [0])
  this.on('collided', function(other) {
    if(other instanceof Planet) {
      powerup.invoke.call(this, other)
      this.kill()
    }
  })
})

var powerups = [
  {
    name: "energy-boost",
    texture: 'media/star.png',
    invoke: function(player) {

    }
  },
  {
    name: "health-boost",
    texture: 'media/heart.png',
    invoke: function(player) {
      
    }
  },
  {
    name: "destruction-field",
    texture: 'media/destruction.png',
    invoke: function(player) {

    }
  },
  {
    name: "infinite-energy",
    texture: 'media/infinite.png',
    invoke: function(player) {

    }
  }
]
