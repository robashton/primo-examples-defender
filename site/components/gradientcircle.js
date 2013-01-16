var GradientCircle = function(entity, inner, middle, outer) {
  this.entity = entity
  this.inner = inner
  this.middle = middle
  this.outer = outer
}

GradientCircle.prototype = {
  render: function(context) {
      context.beginPath();
      var gradient = context.createRadialGradient(this.entity.x, this.entity.y, 0, 
                                                  this.entity.x, this.entity.y, this.entity.width);
      gradient.addColorStop(0, this.inner);
      gradient.addColorStop(0.4, this.inner);
      gradient.addColorStop(0.4, this.middle);
      gradient.addColorStop(1, this.outer);
      context.fillStyle = gradient;
      context.arc(this.entity.x, this.entity.y, this.entity.width, Math.PI * 2, false);
      context.fill();
  }
}

module.exports = GradientCircle
