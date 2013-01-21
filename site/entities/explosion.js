var Primo = require('primo')

var ParticleEmitter = require('../components/particleemitter')

module.exports = Primo.DefineEntity(function(id, data) {
  this.attach(new ParticleEmitter(this, data))
})
