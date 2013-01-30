var Primo = require('primo')
var Asteroid = require('./asteroid')

module.exports = Primo.DefineEntity(function(id, data) {
  var spawner = this
    , game = spawner.game
    , variables = game.variables
    , scene = game.scene

  function spawnNextAsteroid() {
      var angle = Math.random() * (Math.PI * 2);
      var xdir = Math.cos(angle);
      var ydir = Math.sin(angle);
      var x = 1500 * xdir;
      var y = 1500 * ydir;

      var speed = 30.0 + Math.random() * variables.speedSeed;
      var accuracy = 0.5 - Math.random()
      var xvel = speed * ((-xdir) + accuracy);
      var yvel = speed * ((-ydir) - accuracy);

      scene.spawnEntity(Asteroid, {
        x: x,
        y: y,
        velx: xvel,
        vely: yvel
      })
      game.scheduleEvent(spawnNextAsteroid, variables.spawnTime)
  }
  spawnNextAsteroid()
})
