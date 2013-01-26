var MenuScreen = function() {
  this.options = []
  this.artifacts = []
}

MenuScreen.prototype = {
  render: function(context) {
    for(var i = 0 ; i < this.artifacts.length; i++)
      this.renderArtifact(context, this.artifacts[i])
    for(var i = 0 ; i < this.options.length; i++) 
      this.renderOption(this.options[i])
  },
  renderArtifact: function(context, artifact) {
    context.fillStyle = artifact.colour
    context.font = artifact.font
    context.fillText(artifact.text, artifact.x, artifact.y)
  },
  renderOption: function(context, option) {
    context.fillStyle = option.colour
    context.font = option.font
    context.fillText(option.text, option.x, option.y)
    if(option.selected) {

    }
  }
}

module.exports = MenuScreen
