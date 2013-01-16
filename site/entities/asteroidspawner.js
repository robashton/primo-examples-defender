var Primo = require('primo')
var Asteroid = require('./asteroid')

module.exports = Primo.DefineEntity(function(id, data) {
  this.spawnTime = 5000
  this.speedSeed = 50 
  
  var spawner = this
    , scene = spawner.game.scene

  function spawnNextAsteroid() {
      var angle = Math.random() * (Math.PI * 2);
      var xdir = Math.cos(angle);
      var ydir = Math.sin(angle);
      var x = 1500 * xdir;
      var y = 1500 * ydir;

      var speed = 30.0 + Math.random() * spawner.speedSeed;
      var accuracy = 0// 2.0 - Math.random() * 4.0;
      var xvel = speed * ((-xdir) + accuracy);
      var yvel = speed * ((-ydir) - accuracy);

      scene.spawnEntity(Asteroid, {
        x: x,
        y: y,
        velx: xvel,
        vely: yvel
      })
      setTimeout(spawnNextAsteroid, spawner.spawnTime)
  }
  spawnNextAsteroid()
})
