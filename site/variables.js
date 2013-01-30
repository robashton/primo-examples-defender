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
  this.speedSeed = 50
}

TinyDefenderVariables.prototype = {
  onLevelChanged: function(level) {
    this.spawnTime = Math.max(5000 - (level * 300), 500)
    this.speedSeed = Math.min(50 + (level * 10), 100)
  }
}
