var Primo = require('primo')

var ScoreKeeper = Primo.DefineEntity(function(id, data) {
  var score = 0
    , level = 1
    , multiplier = 1
    , keeper = this

  this.scene.on('damaged', function() {
    multiplier = 1
  })
  this.scene.on('asteroid-destroyed', function() {
    score += level * multiplier
    multiplier++
    keeper.raise('score-changed', score)
  })

})

module.exports = ScoreKeeper
