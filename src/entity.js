class Entity {
    constructor(x, y, id1, id2, st1, st2, fall, dead) {
        this.startX = x;
        this.startY = y;
        this.animTime;
        this.animFrame;
        this.state;
        this.angle;
        this.flySpeed;
        this.fallSpeed;
        this.graveY;
        this.kills = 0;

        this.img = [
            R.images[id1], R.images[id2],
            R.images[st1], R.images[st2],
            R.images[fall], R.images[dead]
        ];
    }

    start() {
        this.setState(IDLE);
    }

    setState(st) {
        this.state = st;
        switch (this.state) {
            case IDLE:
                this.animTime = .8 + (Math.random() * 5) / 10;
                this.angle = this.animFrame = 0;
                this.flySpeed = 1200;
                this.fallSpeed = 1000;
                this.graveY = -160;
                this.x = this.startX;
                this.y = this.startY;
                break;
            case DRAW:
                break;
            case FIRE:
                this.animFrame = 2;
                break;
            case DEAD:
                this.animFrame = 4;
                break;
        }
    }

    update(dt) {
        if (this.state != DEAD && (this.animTime -= dt) < 0) {
            this.animTime = .8;
            this.animFrame = ((this.animFrame + 1) % 2) + (this.state === FIRE ? 2 : 0);
        }
    }

    draw(ctx) {

    }
}