var util = require('primo-utils')

var ParticleEmitter = function(entity, data) {
  this.entity = entity
  this.particles = [];
  this.r = util.valueOrDefault(data.r, 1.0)
  this.g = util.valueOrDefault(data.g, 1.0)
  this.b = util.valueOrDefault(data.b, 1.0)
  this.amount = util.valueOrDefault(data.amount, 10)
  this.lifetime = util.valueOrDefault(data.lifetime, 250)
  this.ticks = 0
  this.initParticles()
}

ParticleEmitter.prototype = {
  tick: function() {
    if( this.ticks++ >= this.lifetime) 
      this.entity.kill()
  },
  initParticles: function() {
    for(var i = 0 ; i < this.amount ; i++) {
      var velx = 1.0 - Math.random() * 2.0;
      var vely = 1.0 - Math.random() * 2.0;
      var size = 10.0 + Math.random() * 10.0;
      var r = Math.random() * (this.r * 255) >> 0;
      var g = Math.random() * (this.g * 255) >> 0;
      var b = Math.random() * (this.b * 255) >> 0;
      var colour = "rgba("+r+","+g+","+b+",0.5)";
      this.particles.push({
        x: this.entity.x,
        y: this.entity.y,
        velx: velx,
        vely: vely,
        size: size,
        colour: colour
      })
    }
  },
  render: function(context) { 
    context.save();
    context.globalAlpha = Math.max(1.0 - (this.ticks / this.lifetime, 0.0));
    for(var i = 0; i < this.amount ; i++) {
      var particle = this.particles[i];
      this.updateParticle(particle);

      context.beginPath();
      var gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size);
      gradient.addColorStop(0, "white");
      gradient.addColorStop(0.1, "white");
      gradient.addColorStop(0.1, particle.colour);
      gradient.addColorStop(1, "transparent");
      context.fillStyle = gradient;
      context.arc(particle.x, particle.y, particle.size, Math.PI * 2, false);
      context.fill();
    }
    context.restore();
  },
  updateParticle: function(particle) {
    particle.x += particle.velx;
    particle.y += particle.vely;
  }
}

module.exports = ParticleEmitter
