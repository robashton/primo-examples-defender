var Primo = require('primo')
var engine = Primo.Create('game')

var Planet = require('./entities/planet')

engine.on('init', function() {
  var scene = engine.scene
    , camera = scene.camera
    , planet = scene.spawnEntity(Planet, {
      x: 0,
      y: 0,
      radius: 128
    })

  camera.moveTo(0,0)
  camera.zoomTo(1000)
})

engine.start()
