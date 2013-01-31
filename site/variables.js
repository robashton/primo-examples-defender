module.exports = {
  init: function(engine) {
    engine.variables = new TinyDefenderVariables(engine)
  }
}

var TinyDefenderVariables = function(engine) {
  this.engine = engine
  this.scene = engine.scene
  this.scene.on('level-changed', this.onLevelChanged, this)
  this.spawnTime = 0
  this.speedSeed = 0
  this.firingConsumption = 25
  this.firingRegen = 1
  this.firingRate = 10
  this.bulletSpeed = 90
}

TinyDefenderVariables.prototype = {
  onLevelChanged: function(level) {
    this.spawnTime = Math.max(2500 - (level * 300), 500)
    this.speedSeed = Math.min(50 + (level * 10), 100)
    this.firingConsumption = 5
    this.firingRegen = 0.2
    this.firingRate = 10
    this.bulletSpeed = 90
  }
}
