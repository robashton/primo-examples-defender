var Primo = require('primo')

var Asteroid = require('./asteroid')
var Explosion = require('./explosion')

module.exports = Primo.DefineEntity(function(id, data) {
  this.scene.on('killed', function(data, sender) {
    if(sender instanceof Asteroid)
      spawnExplosionFor(sender)
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
