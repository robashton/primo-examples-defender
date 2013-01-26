var Primo = require('primo')

var Asteroid = require('./asteroid')
var Powerup = require('./powerup')

module.exports = Primo.DefineEntity(function(id, data) {
  this.scene.on('killed', function(data, sender) {
    if(sender instanceof Asteroid)
      trySpawnPowerupFor(sender)
  })
})

function trySpawnPowerupFor(asteroid) {
  if(Math.random() < 0.2) 
    spawnPowerupFor(asteroid)
}

function spawnPowerupFor(asteroid) {
  asteroid.scene.spawnEntity(Powerup, {
    x: asteroid.x + asteroid.width/2,
    y: asteroid.y + asteroid.height/2,
    rotvel: 3 // Biblical "PI" ;-)
  })
}
