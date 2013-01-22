var Primo = require('primo')

var Asteroid = require('./asteroid')

module.exports = Primo.DefineEntity(function(id, data) {
  this.scene.on('killed', function(entity) {
    if(entity instanceof Asteroid)
      trySpawnPowerupFor(entity)
  })
})

function trySpawnPowerupFor(asteroid) {
  if(Math.random() < 0.2) 
    spawnPowerupFor(asteroid)
}

function spawnPowerupFor(asteroid) {

}
