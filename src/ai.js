class AI extends Entity {
  constructor(x, y, id1, id2, st1, st2, fall, dead) {
    super(x, y, id1, id2, st1, st2, fall, dead);
    this.reactionTime;
    this.shoot;
  }

  start() {
    super.start();
    this.reactionTime = (Math.random() * .5 + .2);
  }

  update(dt) {
    switch (this.state) {
      case FIRE:
        break;
      case DRAW:
        if ((this.reactionTime -= dt) < 0) {
          this.shoot();
        }
        break;
      case IDLE:
        break;
      case DEAD:
        if ((this.angle += 10 * dt) > TWO_PI) this.angle = 0;
        this.x += dt * this.flySpeed;
        this.flySpeed += 250 * dt;
        this.y += 400 * dt;
        if (this.x > WIDTH + this.img[0].height) {
          this.setState(GRAVEDOWN);
        }
        break;
      case GRAVEDOWN:
        this.graveY += this.fallSpeed * dt;
        this.fallSpeed += 5000 * dt;
        if (this.graveY > 144) {
          this.graveY = 144;
          this.state = WAITRESTART;
          P.startDust(864, 1024, 266);
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
      case FIRE:
        ctx.drawImage(this.img[this.animFrame], this.x - 29, this.y);
        break;
      case DEAD:
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.img[0], -(this.img[0].width >> 1), -30);
        ctx.restore();
        break;
      case IDLE:
      case DRAW:
        ctx.drawImage(this.img[this.animFrame], this.x, this.y);
        break;
      case GRAVEDOWN:
        ctx.drawImage(this.img[4], 855, this.graveY);
        break;
      case WAITRESTART:
      case GONER:
        ctx.drawImage(this.img[5], 835, this.graveY);
        break;
    }
  }
}