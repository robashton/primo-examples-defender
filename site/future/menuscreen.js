var util = require('primo-utils')

var MenuScreen = function(menu) {
  this.options = []
  this.artifacts = []
  this.menu = menu
}

MenuScreen.prototype = {
  render: function(context) {
    var i 
    for(i = 0 ; i < this.artifacts.length; i++)
      this.renderArtifact(context, this.artifacts[i])
    for(i = 0 ; i < this.options.length; i++) 
      this.renderOption(context, this.options[i])
  },
  renderArtifact: function(context, artifact) {
    context.fillStyle = util.valueOrDefault(artifact.colour, this.menu.defaultColour)
    context.font = util.valueOrDefault(artifact.font, this.menu.font)
    context.fillText(artifact.text, artifact.x, artifact.y)
  },
  renderOption: function(context, option) {
    context.fillStyle = util.valueOrDefault(option.colour, this.menu.defaultColour)
    context.font = util.valueOrDefault(option.font, this.menu.font)
    context.fillText(option.text, option.x, option.y)
    if(option.selected) {

    }
  }
}

module.exports = MenuScreen
