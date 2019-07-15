class Flash {
    constructor() {
        this.size;
        this.x;
        this.y;
        this.alpha = 1;
        this.isAlive;
    }

    start(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.isAlive = true;
    }

    update(dt) {
        this.alpha -= dt * 2;
        if ((this.size += 600 * dt) > 40) {
            this.isAlive = false;
        }
    }

    draw(ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.fillStyle = "OrangeRed";
        ctx.arc(this.x, this.y, this.size, 0, TWO_PI);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}