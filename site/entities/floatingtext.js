var Text = require('primo-text')
var Primo = require('primo')

var TimedRemoval = require('../components/timedremoval')

module.exports = Primo.DefineEntity(function(id, data) {
  this.height = 60
  this.vely = -60
  this.attach(new Text(this, data.text, '#FFF'))
  this.attach(new TimedRemoval(this, data.time))
})
