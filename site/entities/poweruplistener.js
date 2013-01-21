var Primo = require('primo')

var Asteroid = require('./asteroid')

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

}
