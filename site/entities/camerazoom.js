var Primo = require('primo')

module.exports = Primo.DefineEntity(function(id, data) {
  var timeSinceLastFire = 0
    , minZoom = 1000
    , maxZoom = 3000
    , currentZoom = 1000
    , camera = this.scene.camera

  camera.zoomTo(currentZoom)

  this.scene.on('fired', function() {
    currentZoom = Math.min(maxZoom, currentZoom+30)
    camera.zoomTo(currentZoom)
    timeSinceLastFire = 0
  })

  this.on('tick', function() {
    if(currentZoom > minZoom && timeSinceLastFire > 60) {
      currentZoom -= 10
      camera.zoomTo(currentZoom)
    }
    timeSinceLastFire++
  })
})
