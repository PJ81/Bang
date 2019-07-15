class Resources {
    constructor(cb) {
        this.images = new Array(14);

        Promise.all([
            (loadImage("./img/l_id_1.png")).then((i) => {
                this.images[L_ID_1] = i;
            }),
            (loadImage("./img/l_id_2.png")).then((i) => {
                this.images[L_ID_2] = i;
            }),
            (loadImage("./img/l_st_1.png")).then((i) => {
                this.images[L_ST_1] = i;
            }),
            (loadImage("./img/l_st_2.png")).then((i) => {
                this.images[L_ST_2] = i;
            }),
            (loadImage("./img/r_id_1.png")).then((i) => {
                this.images[R_ID_1] = i;
            }),
            (loadImage("./img/r_id_2.png")).then((i) => {
                this.images[R_ID_2] = i;
            }),
            (loadImage("./img/r_st_1.png")).then((i) => {
                this.images[R_ST_1] = i;
            }),
            (loadImage("./img/r_st_2.png")).then((i) => {
                this.images[R_ST_2] = i;
            }),
            (loadImage("./img/p1.png")).then((i) => {
                this.images[P1] = i;
            }),
            (loadImage("./img/p2.png")).then((i) => {
                this.images[P2] = i;
            }),
            (loadImage("./img/w1.png")).then((i) => {
                this.images[W1] = i;
            }),
            (loadImage("./img/w2.png")).then((i) => {
                this.images[W2] = i;
            }),
            (loadImage("./img/grave.png")).then((i) => {
                this.images[GRAVE] = i;
            }),
            (loadImage("./img/fall.png")).then((i) => {
                this.images[FALL] = i;
            })
        ]).then(() => {
            cb(0);
        });
    }

    image(index) {
        if (index < this.images.length) {
            return this.images[index];
        }
        return null;
    }
}