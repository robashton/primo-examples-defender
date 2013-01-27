var Primo = require('primo')

var Asteroid = require('./asteroid')
var Explosion = require('./explosion')
var Planet = require('./planet')

module.exports = Primo.DefineEntity(function(id, data) {
  this.scene.on('killed', function(data, sender) {
    if(sender instanceof Asteroid)
      spawnExplosionFor(sender)
    if(sender instanceof Planet)
      spawnGameOverExplosion(sender)
  })
})

function spawnExplosionFor(asteroid) {
  asteroid.scene.spawnEntity(Explosion, {
    x: asteroid.x + asteroid.width/2,
    y: asteroid.y + asteroid.height/2,
    r: 1.0,
    g: 0.5,
    b: 0.01,
    lifetime: 120       
  })
}

function spawnGameOverExplosion(planet) {
  planet.scene.spawnEntity(Explosion, {
    x: planet.x + planet.width/2,
    y: planet.y + planet.height/2,
    r: 0.01,
    g: 1.0,
    b: 1.0,
    lifetime: 120       
  })
}
