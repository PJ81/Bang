class Game {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = "canvas";
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.canvas.style.backgroundImage = "url('.//img/back.jpg')"

        this.canvas.addEventListener("click", (e) => {
            this.input();
        }, false);

        this.canvas.addEventListener("touchstart", (e) => {
            this.input();
        }, false);

        this.count;
        this.countDown;
        this.state;

        this.flash = new Flash();
        this.clouds = new Clouds();

        this.ctx = this.canvas.getContext('2d');
        this.ctx.textAlign = "center";
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
        this.ctx.shadowBlur = 2;

        document.body.appendChild(this.canvas);

        this.player = new Player(170, 133, L_ID_1, L_ID_2, L_ST_1, L_ST_2, FALL, GRAVE);
        this.ai = new AI(880, 133, R_ID_1, R_ID_2, R_ST_1, R_ST_2, FALL, GRAVE);
        this.ai.shoot = this.shoot = () => {
            this.ai.setState(FIRE);
            this.player.setState(DEAD);
            this.state = WAITRESTART;
            this.ai.kills++;
            P.startBlood(this.player.x + 70, this.player.y + 60);
            this.flash.start(840, 190);
        };

        this.lastTime = 0;
        this.accumulator = 0;
        this.deltaTime = 1 / 60;

        this.start();

        this.loop = (time) => {
            this.accumulator += (time - this.lastTime) / 1000;
            while (this.accumulator > this.deltaTime) {
                this.accumulator -= this.deltaTime;
                this.update(Math.min(this.deltaTime, .5));
            }

            this.lastTime = time;
            this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            this.draw(this.ctx);

            requestAnimationFrame(this.loop);
        }

        this.loop(0);
    }

    start() {
        this.countDown = 1.5;
        this.count = 3;
        this.state = COUNTDOWN;
        this.player.start();
        this.ai.start();
    }

    update(dt) {
        this.clouds.update(dt);
        this.player.update(dt);
        this.ai.update(dt);

        if (this.flash.isAlive) this.flash.update(dt)
        if (P.active) P.update(dt);

        switch (this.state) {
            case COUNTDOWN:
                if ((this.countDown -= dt) < 0) {
                    this.count--;
                    switch (this.count) {
                        case 2:
                            this.countDown = 1;
                            break;
                        case 1:
                            this.countDown = 1 + Math.random() * 2;
                            break;
                        case 0:
                            this.state = DRAW;
                            this.player.setState(DRAW);
                            this.ai.setState(DRAW);
                    }
                }
                break;
            case WAITRESTART:
                if (this.player.state === GONER) this.state = DONE;
                else if (this.ai.state === GONER) this.state = DONE;
                break;
        }
    }

    draw(ctx) {
        this.clouds.draw(ctx);
        if (this.flash.isAlive) this.flash.draw(ctx);

        this.player.draw(ctx);
        this.ai.draw(ctx);

        switch (this.state) {
            case COUNTDOWN:
                if (this.count > 0) {
                    this.ctx.textAlign = "center";
                    this.ctx.font = "110px 'Sancreek'";
                    this.ctx.fillStyle = "#eee"
                    this.ctx.shadowColor = "rgba(0,0,0,0.6)";
                    ctx.fillText("" + this.count, WIDTH >> 1, HEIGHT >> 1);
                    this.ctx.shadowColor = "rgba(0,0,0,0)";
                }
                break;
            case DRAW:
                this.ctx.textAlign = "center";
                this.ctx.font = "110px 'Sancreek'";
                this.ctx.fillStyle = "crimson"
                this.ctx.shadowColor = "rgba(0,0,0,0.6)";
                ctx.fillText("FIRE!", WIDTH >> 1, HEIGHT >> 1);
                this.ctx.shadowColor = "rgba(0,0,0,0)";
                break;
            case DONE:
                this.ctx.textAlign = "center";
                this.ctx.font = "60px 'Sancreek'";
                this.ctx.fillStyle = "#eee"
                this.ctx.shadowColor = "rgba(0,0,0,0.6)";
                ctx.fillText("NEXT", WIDTH >> 1, HEIGHT >> 1);
                this.ctx.shadowColor = "rgba(0,0,0,0)";
                break;
        }
        if (P.active) P.draw(ctx);

        this.ctx.shadowColor = "rgba(0,0,0,0.6)";
        this.ctx.font = "30px 'Sancreek'";
        this.ctx.fillStyle = "#eee"
        this.ctx.textAlign = "left";
        ctx.fillText("KILLS: " + this.player.kills, 10, 35);
        this.ctx.textAlign = "right";
        ctx.fillText("KILLS: " + this.ai.kills, WIDTH - 10, 35);
        this.ctx.shadowColor = "rgba(0,0,0,0)";
    }

    input() {
        switch (this.state) {
            case DONE:
                this.start();
                break;
            case DRAW:
                if (this.state !== DRAW) return;
                this.player.setState(FIRE);
                this.ai.setState(DEAD);
                this.state = WAITRESTART;
                this.player.kills++;
                P.startBlood(this.ai.x + 70, this.ai.y + 60, -1);
                this.flash.start(292, 190);
                break;
        }
    }
}
const P = new ParticleSystem();
const R = new Resources(() => new Game());