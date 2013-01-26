var Primo = require('primo')
  , Asteroid = require('./asteroid')

module.exports = Primo.DefineEntity(function(id, data) {
  this.attach({
    entity: this,
    radius: 0,
    tick: function() {
      this.radius += 10
      if(this.radius > 1000)
        this.entity.kill()
    },
    render: function(context) {
      context.save()
      context.globalAlpha = 0.2
      context.fillStyle = '#505'
      context.beginPath();
      context.arc(this.entity.x, this.entity.y, this.radius, 0, Math.PI*2, true); 
      context.closePath();
      context.fill();
      context.restore()
    }
  })
  this.scene.forEachVisibleEntity(function(entity) {
    if(entity instanceof Asteroid)
      entity.kill()
  })
})
