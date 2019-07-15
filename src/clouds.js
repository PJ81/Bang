class Cloud {
    constructor(x, y, v) {
        this.x = x;
        this.y = y;
        this.vx = v;
        this.img = R.images[rand(W1, FALL)];
    }
}

class Clouds {
    constructor() {
        this.clouds = [];

        this.clouds.push(new Cloud(rand(250, 700), rand(10, 40), Math.random() * 5 + 5));
        for (let r = 0; r < 5; r++) {
            this.addCloud();
        }
    }

    addCloud() {
        const c = this.clouds[this.clouds.length - 1];
        this.clouds.push(new Cloud(c.x + rand(300, 600), rand(10, 40), Math.random() * 5 + 5));
    }

    update(dt) {
        const len = this.clouds.length - 1;
        for (let r = len; r > -1; r--) {
            const c = this.clouds[r];
            c.x -= dt * c.vx;
            if (c.x < -c.img.width) {
                this.clouds.splice(r, 1);
                this.addCloud();
            }
        }
    }

    draw(ctx) {
        for (let r = 0, len = this.clouds.length; r < len; r++) {
            const c = this.clouds[r];
            if (c.x < 1200) {
                ctx.drawImage(c.img, c.x, c.y);
            }
        }
    }
}