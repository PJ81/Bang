function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = url;
    });
}

function rand(mn, mx) {
    const r = mx - mn;
    return Math.floor(Math.random() * r + mn);
}

function getData(file, callback) {
    loadFile(file).then(data => callback(data));
}

async function loadFile(file) {
    const r = await fetch(file);
    const data = await r.arrayBuffer();
    return new Uint8Array(data);
}

function rand() {
    return Math.floor(Math.random() * 65536);
}

function rand(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
}

function repeatImage(img, n = 2, hr = true) {
    let size;
    const cn = document.createElement("canvas");
    if (hr) {
        size = img.width;
        cn.width = size * n;
        cn.height = img.height;
    } else {
        size = img.height;
        cn.width = img.width;
        cn.height = size * n;
    }
    const x = cn.getContext("2d");

    if (hr) {
        for (let r = 0; r < cn.width; r += size) {
            x.drawImage(img, r, 0);
        }
    } else {
        for (let r = 0; r < cn.height; r += size) {
            x.drawImage(img, 0, r);
        }
    }
    const i = new Image();
    i.src = cn.toDataURL();
    return i;
}

function mirror(img, hr = true) {
    const s = document.createElement("canvas");
    s.width = img.width;
    s.height = img.height;
    const c = s.getContext("2d");
    if (hr) {
        c.translate(s.width, 0);
        c.scale(-1, 1);
    } else {
        c.translate(0, s.height);
        c.scale(1, -1);
    }
    c.drawImage(img, 0, 0);
    const i = new Image();
    i.src = s.toDataURL();
    return i;
}

class State {
    constructor() {}
    update(dt) {}
    draw(ctx) {}
    input(i) {}
    start() {}
    stats(ctx) {}
}

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    sub(vec) {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }

    add(vec) {
        return new Vector(this.x + vec.x, this.y + vec.y);
    }

    equals(vec) {
        return vec.x === this.x && vec.y === this.y;
    }

    normalize() {
        const len = this.len();
        this.x /= len;
        this.y /= len;
    }

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}