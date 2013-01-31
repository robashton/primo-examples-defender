var Primo = require('primo')

var Asteroid = require('./asteroid')
var Powerup = require('./powerup')
var FloatingText = require('./floatingtext')

module.exports = Primo.DefineEntity(function(id, data) {
  var scene = this.scene
  scene.on('asteroid-destroyed', function(asteroid) {
    trySpawnPowerupFor(asteroid)
  })
  scene.on('powerup-collected', function(powerup) {
    scene.spawnEntity(FloatingText, {
      x: powerup.x,
      y: powerup.y,
      text: powerup.name,
      time: 3
    })
  })
})

function trySpawnPowerupFor(asteroid) {
  if(Math.random() < 0.4) 
    spawnPowerupFor(asteroid)
}

function spawnPowerupFor(asteroid) {
  asteroid.scene.spawnEntity(Powerup, {
    x: asteroid.x + asteroid.width/2,
    y: asteroid.y + asteroid.height/2,
    rotvel: 3 // Biblical "PI" ;-)
  })
}
