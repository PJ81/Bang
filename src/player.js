class Player extends Entity {
  constructor(x, y, id1, id2, st1, st2, fall, dead) {
    super(x, y, id1, id2, st1, st2, fall, dead);
    this.angle = TWO_PI;
  }

  update(dt) {
    switch (this.state) {
      case FIRE:
        break;
      case DEAD:
        if ((this.angle -= 10 * dt) < 0) this.angle = TWO_PI;
        this.x -= dt * this.flySpeed;
        this.flySpeed += 250 * dt;
        this.y += 400 * dt;
        if (this.x < -this.img[0].height) {
          this.setState(GRAVEDOWN);
        }
        break;
      case GRAVEDOWN:
        this.graveY += this.fallSpeed * dt;
        this.fallSpeed += 5000 * dt;
        if (this.graveY > 144) {
          this.graveY = 144;
          this.state = WAITRESTART;
          P.startDust(165, 325, 266);
        }
        break;
      case WAITRESTART:
        if (!P.active) this.setState(GONER);
        break;
    }
    super.update(dt);
  }

  draw(ctx) {
    switch (this.state) {
      case DEAD:
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.img[0], -(this.img[0].width >> 1), -30);
        ctx.restore();
        break;
      case FIRE:
        ctx.drawImage(this.img[this.animFrame], this.x, this.y);
        break;
      case IDLE:
      case DRAW:
        ctx.drawImage(this.img[this.animFrame], this.x, this.y);
        break;
      case GRAVEDOWN:
        ctx.drawImage(this.img[4], 160, this.graveY);
        break;
      case WAITRESTART:
      case GONER:
        ctx.drawImage(this.img[5], 135, this.graveY);
        break;
    }
  }
}