var Primo = require('primo')


module.exports = Primo.DefineEntity(function(id, data) {
  var shoot = this.game.resources.sound('media/shoot')
  var pickup = this.game.resources.sound('media/pickup')
  var splosion = this.game.resources.sound('media/explosion')

  this.scene.on('fired', function() {
    shoot.play()
  })
  this.scene.on('powerup-collected', function() {
    pickup.play()
  })

  this.scene.on('asteroid-destroyed', function() {
    splosion.play()
  })

  this.scene.on('damaged', function() {
    splosion.play()
  })
})
