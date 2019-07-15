class Particle {
  constructor(x, y, dx, dy, velX, velY, clr, sz = 2, fs = 2) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.velX = velX;
    this.velY = velY;
    this.alpha = 1;
    this.size = sz;
    this.fadeSpeed = fs;
    this.color = clr;
  }

  update(dt) {
    this.alpha -= dt * this.fadeSpeed;
    if (this.alpha < 0) {
      this.alpha = 0;
      return;
    }
    this.x += this.dx * this.alpha + this.velX;
    this.y += this.dy * this.alpha + this.velY;
    if (this.x < -this.size || this.y < -this.size || this.x > WIDTH + this.size || this.y > HEIGHT + this.size) {
      this.alpha = 0;
      return;
    }
    if (this.size < 5) this.size += dt * 3;
  }

  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size, this.y - this.size, this.size << 1, this.size << 1);
    ctx.globalAlpha = 1;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.active = false;
    this.x;
    this.y;
  }

  startDust(xn, xm, y) {
    this.active = true;
    for (let a = 0; a < 200; a++) {
      const a = Math.random() * Math.PI;
      this.particles.push(new Particle(rand(xn, xm), y, Math.cos(a), Math.sin(a), -Math.random() * .5, -Math.random() * .5, "#6f3807", 4, 1));
    }
  }

  startBlood(x, y, d = 1) {
    this.active = true;
    for (let a = 0; a < 25; a++) {
      const a = Math.random() * (Math.PI * 2);
      this.particles.push(new Particle(x, y, Math.cos(a), Math.sin(a), d * Math.random() * 3, Math.random() * 3, "darkred"));
    }
  }

  update(dt) {
    let f = false;
    for (let a = 0, len = this.particles.length; a < len; a++) {
      const p = this.particles[a];
      if (p.alpha === 0) continue;
      f = true;
      p.update(dt);
    }

    if (!f) {
      this.active = false;
      return;
    }
  }

  draw(ctx) {
    for (let a = 0, len = this.particles.length; a < len; a++) {
      const p = this.particles[a];
      if (p.alpha === 0) continue;
      p.draw(ctx);
    }
  }
}