class Frames {
    constructor() {

        this.w = [235, 235, 235]; // white
        this.k = [50, 50, 50]; // black
        this.l = [113, 163, 205]; // light blue
        this.r = [255, 0, 0]; // red
        this.g = [0, 255, 0]; // green
        this.b = [0, 0, 255]; // blue
        this.y = [255, 255, 0]; // yellow
        this.m = [207, 11, 49]; // dark danish red
        this.d = [0, 150, 110]; // dark green
        this.i = [35, 159, 64]; // iran green
        this.o = [0, 0, 0]; // off

        // Maybe later find official colors

        this.england = [
            this.w, this.w, this.w, this.r, this.r, this.w, this.w, this.w,
            this.w, this.w, this.w, this.r, this.r, this.w, this.w, this.w,
            this.w, this.w, this.w, this.r, this.r, this.w, this.w, this.w,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.w, this.w, this.w, this.r, this.r, this.w, this.w, this.w,
            this.w, this.w, this.w, this.r, this.r, this.w, this.w, this.w,
            this.w, this.w, this.w, this.r, this.r, this.w, this.w, this.w
        ];

        this.germany = [
            this.k, this.k, this.k, this.k, this.k, this.k, this.k, this.k,
            this.k, this.k, this.k, this.k, this.k, this.k, this.k, this.k,
            this.k, this.k, this.k, this.k, this.k, this.k, this.k, this.k,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.y, this.y, this.y, this.y, this.y, this.y, this.y, this.y,
            this.y, this.y, this.y, this.y, this.y, this.y, this.y, this.y,
            this.y, this.y, this.y, this.y, this.y, this.y, this.y, this.y,
        ];

        this.france = [
            this.b, this.b, this.b, this.w, this.w, this.r, this.r, this.r,
            this.b, this.b, this.b, this.w, this.w, this.r, this.r, this.r,
            this.b, this.b, this.b, this.w, this.w, this.r, this.r, this.r,
            this.b, this.b, this.b, this.w, this.w, this.r, this.r, this.r,
            this.b, this.b, this.b, this.w, this.w, this.r, this.r, this.r,
            this.b, this.b, this.b, this.w, this.w, this.r, this.r, this.r,
            this.b, this.b, this.b, this.w, this.w, this.r, this.r, this.r,
            this.b, this.b, this.b, this.w, this.w, this.r, this.r, this.r
        ];

        this.spain = [
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.y, this.y, this.y, this.y, this.y, this.y, this.y, this.y,
            this.y, this.y, this.y, this.r, this.w, this.y, this.y, this.y,
            this.y, this.y, this.y, this.w, this.r, this.y, this.y, this.y,
            this.y, this.y, this.y, this.y, this.y, this.y, this.y, this.y,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
        ];

        this.italy = [
            this.g, this.g, this.g, this.w, this.w, this.r, this.r, this.r,
            this.g, this.g, this.g, this.w, this.w, this.r, this.r, this.r,
            this.g, this.g, this.g, this.w, this.w, this.r, this.r, this.r,
            this.g, this.g, this.g, this.w, this.w, this.r, this.r, this.r,
            this.g, this.g, this.g, this.w, this.w, this.r, this.r, this.r,
            this.g, this.g, this.g, this.w, this.w, this.r, this.r, this.r,
            this.g, this.g, this.g, this.w, this.w, this.r, this.r, this.r,
            this.g, this.g, this.g, this.w, this.w, this.r, this.r, this.r
        ];

        this.sweden = [
            this.b, this.b, this.y, this.y, this.b, this.b, this.b, this.b,
            this.b, this.b, this.y, this.y, this.b, this.b, this.b, this.b,
            this.b, this.b, this.y, this.y, this.b, this.b, this.b, this.b,
            this.y, this.y, this.y, this.y, this.y, this.y, this.y, this.y,
            this.y, this.y, this.y, this.y, this.y, this.y, this.y, this.y,
            this.b, this.b, this.y, this.y, this.b, this.b, this.b, this.b,
            this.b, this.b, this.y, this.y, this.b, this.b, this.b, this.b,
            this.b, this.b, this.y, this.y, this.b, this.b, this.b, this.b,
        ];

        this.netherlands = [
            this.m, this.m, this.m, this.m, this.m, this.m, this.m, this.m,
            this.m, this.m, this.m, this.m, this.m, this.m, this.m, this.m,
            this.m, this.m, this.m, this.m, this.m, this.m, this.m, this.m,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.b, this.b, this.b, this.b, this.b, this.b, this.b, this.b,
            this.b, this.b, this.b, this.b, this.b, this.b, this.b, this.b,
            this.b, this.b, this.b, this.b, this.b, this.b, this.b, this.b,
        ];

        this.denmark = [
            this.m, this.m, this.w, this.w, this.m, this.m, this.m, this.m,
            this.m, this.m, this.w, this.w, this.m, this.m, this.m, this.m,
            this.m, this.m, this.w, this.w, this.m, this.m, this.m, this.m,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.m, this.m, this.w, this.w, this.m, this.m, this.m, this.m,
            this.m, this.m, this.w, this.w, this.m, this.m, this.m, this.m,
            this.m, this.m, this.w, this.w, this.m, this.m, this.m, this.m,
        ];


        this.usa = [
            this.b, this.b, this.b, this.r, this.r, this.r, this.r, this.r,
            this.b, this.w, this.b, this.w, this.w, this.w, this.w, this.w,
            this.b, this.b, this.b, this.r, this.r, this.r, this.r, this.r,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
        ];

        this.belgium = [
            this.k, this.k, this.k, this.y, this.y, this.r, this.r, this.r,
            this.k, this.k, this.k, this.y, this.y, this.r, this.r, this.r,
            this.k, this.k, this.k, this.y, this.y, this.r, this.r, this.r,
            this.k, this.k, this.k, this.y, this.y, this.r, this.r, this.r,
            this.k, this.k, this.k, this.y, this.y, this.r, this.r, this.r,
            this.k, this.k, this.k, this.y, this.y, this.r, this.r, this.r,
            this.k, this.k, this.k, this.y, this.y, this.r, this.r, this.r,
            this.k, this.k, this.k, this.y, this.y, this.r, this.r, this.r
        ];

        this.argentina = [
            this.l, this.l, this.l, this.l, this.l, this.l, this.l, this.l,
            this.l, this.l, this.l, this.l, this.l, this.l, this.l, this.l,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.w, this.w, this.w, this.y, this.y, this.w, this.w, this.w,
            this.w, this.w, this.w, this.y, this.y, this.w, this.w, this.w,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.l, this.l, this.l, this.l, this.l, this.l, this.l, this.l,
            this.l, this.l, this.l, this.l, this.l, this.l, this.l, this.l,
        ];

        this.portugal = [
            this.g, this.g, this.g, this.r, this.r, this.r, this.r, this.r,
            this.g, this.g, this.g, this.r, this.r, this.r, this.r, this.r,
            this.g, this.g, this.g, this.r, this.r, this.r, this.r, this.r,
            this.g, this.g, this.y, this.y, this.r, this.r, this.r, this.r,
            this.g, this.g, this.y, this.y, this.r, this.r, this.r, this.r,
            this.g, this.g, this.g, this.r, this.r, this.r, this.r, this.r,
            this.g, this.g, this.g, this.r, this.r, this.r, this.r, this.r,
            this.g, this.g, this.g, this.r, this.r, this.r, this.r, this.r
        ];

        this.iran = [
            this.i, this.i, this.i, this.i, this.i, this.i, this.i, this.i,
            this.i, this.i, this.i, this.i, this.i, this.i, this.i, this.i,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.w, this.w, this.w, this.r, this.r, this.w, this.w, this.w,
            this.w, this.w, this.w, this.r, this.r, this.w, this.w, this.w,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r
        ];

        this.bulgaria = [
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.w, this.w, this.w, this.w, this.w, this.w, this.w, this.w,
            this.d, this.d, this.d, this.d, this.d, this.d, this.d, this.d,
            this.d, this.d, this.d, this.d, this.d, this.d, this.d, this.d,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r,
            this.r, this.r, this.r, this.r, this.r, this.r, this.r, this.r
        ];

        this.flags = [
            this.england, this.germany, this.france,
            this.spain, this.italy, this.sweden,
            this.netherlands, this.denmark, this.bulgaria,
            this.belgium, this.portugal, this.iran,
            this.argentina, this.usa
        ];

        this.frame0 = [
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.w,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.k,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.w,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.w,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o
        ];
        
        this.frame1 = [
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.w,
            this.o, this.o, this.o, this.o, this.o, this.o, this.w, this.w,
            this.o, this.o, this.o, this.o, this.o, this.o, this.w, this.k,
            this.o, this.o, this.o, this.o, this.o, this.o, this.k, this.k,
            this.o, this.o, this.o, this.o, this.o, this.o, this.w, this.k,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.w,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o
        ];

        this.frame2 = [
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.w,
            this.o, this.o, this.o, this.o, this.o, this.o, this.k, this.w,
            this.o, this.o, this.o, this.o, this.o, this.k, this.w, this.w,
            this.o, this.o, this.o, this.o, this.o, this.w, this.w, this.k,
            this.o, this.o, this.o, this.o, this.o, this.w, this.k, this.k,
            this.o, this.o, this.o, this.o, this.o, this.w, this.w, this.k,
            this.o, this.o, this.o, this.o, this.o, this.o, this.w, this.w,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.w
        ];

        this.frame3 = [
            this.o, this.o, this.o, this.o, this.o, this.o, this.w, this.k,
            this.o, this.o, this.o, this.o, this.o, this.w, this.w, this.w,
            this.o, this.o, this.o, this.o, this.w, this.w, this.k, this.w,
            this.o, this.o, this.o, this.o, this.w, this.k, this.k, this.k,
            this.o, this.o, this.o, this.o, this.w, this.w, this.k, this.w,
            this.o, this.o, this.o, this.o, this.k, this.w, this.w, this.w,
            this.o, this.o, this.o, this.o, this.o, this.k, this.w, this.k,
            this.o, this.o, this.o, this.o, this.o, this.o, this.w, this.w
        ];

        this.frame4 = [
            this.o, this.o, this.o, this.o, this.o, this.k, this.k, this.k,
            this.o, this.o, this.o, this.o, this.w, this.w, this.k, this.w,
            this.o, this.o, this.o, this.w, this.k, this.w, this.w, this.w,
            this.o, this.o, this.o, this.k, this.k, this.k, this.w, this.k,
            this.o, this.o, this.o, this.w, this.k, this.w, this.w, this.w,
            this.o, this.o, this.o, this.w, this.w, this.w, this.k, this.w,
            this.o, this.o, this.o, this.o, this.w, this.k, this.k, this.k,
            this.o, this.o, this.o, this.o, this.o, this.w, this.k, this.w
        ];

        this.frame5 = [
            this.o, this.o, this.o, this.o, this.w, this.k, this.w, this.w,
            this.o, this.o, this.o, this.w, this.k, this.k, this.k, this.w,
            this.o, this.o, this.w, this.w, this.w, this.k, this.w, this.w,
            this.o, this.o, this.w, this.k, this.w, this.w, this.w, this.k,
            this.o, this.o, this.k, this.k, this.k, this.w, this.k, this.k,
            this.o, this.o, this.w, this.k, this.w, this.w, this.w, this.k,
            this.o, this.o, this.o, this.w, this.w, this.k, this.w, this.w,
            this.o, this.o, this.o, this.o, this.k, this.k, this.k, this.w
        ];

        this.frame6 = [
            this.o, this.o, this.o, this.w, this.w, this.k, this.w, this.o,
            this.o, this.o, this.k, this.w, this.k, this.k, this.k, this.w,
            this.o, this.k, this.w, this.w, this.w, this.k, this.w, this.w,
            this.o, this.w, this.w, this.k, this.w, this.w, this.w, this.k,
            this.o, this.w, this.k, this.k, this.k, this.w, this.k, this.k,
            this.o, this.w, this.w, this.k, this.w, this.w, this.w, this.k,
            this.o, this.o, this.w, this.w, this.w, this.k, this.w, this.w,
            this.o, this.o, this.o, this.w, this.k, this.k, this.k, this.o
        ];

        this.frame7 = [
            this.o, this.o, this.w, this.k, this.k, this.k, this.o, this.o,
            this.o, this.w, this.w, this.w, this.k, this.w, this.w, this.o,
            this.w, this.w, this.k, this.w, this.w, this.w, this.k, this.w,
            this.w, this.k, this.k, this.k, this.w, this.k, this.k, this.k,
            this.w, this.w, this.k, this.w, this.w, this.w, this.k, this.w,
            this.k, this.w, this.w, this.w, this.k, this.w, this.w, this.w,
            this.o, this.k, this.w, this.k, this.k, this.k, this.w, this.o,
            this.o, this.o, this.w, this.w, this.k, this.w, this.o, this.o
        ];

        this.frame8 = [
            this.o, this.k, this.k, this.k, this.w, this.o, this.o, this.o,
            this.w, this.w, this.k, this.w, this.w, this.w, this.o, this.o,
            this.k, this.w, this.w, this.w, this.k, this.w, this.w, this.o,
            this.k, this.k, this.w, this.k, this.k, this.k, this.w, this.o,
            this.k, this.w, this.w, this.w, this.k, this.w, this.w, this.o,
            this.w, this.w, this.k, this.w, this.w, this.w, this.k, this.o,
            this.w, this.k, this.k, this.k, this.w, this.k, this.k, this.o,
            this.o, this.w, this.k, this.w, this.w, this.o, this.o, this.o
        ];

        this.frame9 = [
            this.w, this.k, this.w, this.w, this.o, this.o, this.o, this.o,
            this.k, this.k, this.k, this.w, this.k, this.o, this.o, this.o,
            this.w, this.k, this.w, this.w, this.w, this.k, this.o, this.o,
            this.w, this.w, this.w, this.k, this.w, this.w, this.o, this.o,
            this.k, this.w, this.k, this.k, this.k, this.w, this.o, this.o,
            this.w, this.w, this.w, this.k, this.w, this.w, this.o, this.o,
            this.w, this.k, this.w, this.w, this.w, this.o, this.o, this.o,
            this.k, this.k, this.k, this.w, this.o, this.o, this.o, this.o
        ];

        this.frame10 = [
            this.w, this.k, this.w, this.o, this.o, this.o, this.o, this.o,
            this.k, this.k, this.k, this.w, this.o, this.o, this.o, this.o,
            this.w, this.k, this.w, this.w, this.w, this.o, this.o, this.o,
            this.w, this.w, this.w, this.k, this.w, this.o, this.o, this.o,
            this.k, this.w, this.k, this.k, this.k, this.o, this.o, this.o,
            this.w, this.w, this.w, this.k, this.w, this.o, this.o, this.o,
            this.w, this.k, this.w, this.w, this.o, this.o, this.o, this.o,
            this.k, this.k, this.k, this.o, this.o, this.o, this.o, this.o
        ];

        this.frame11 = [
            this.k, this.k, this.o, this.o, this.o, this.o, this.o, this.o,
            this.k, this.w, this.w, this.o, this.o, this.o, this.o, this.o,
            this.w, this.w, this.k, this.w, this.o, this.o, this.o, this.o,
            this.w, this.k, this.k, this.k, this.o, this.o, this.o, this.o,
            this.w, this.w, this.k, this.w, this.o, this.o, this.o, this.o,
            this.k, this.w, this.w, this.w, this.o, this.o, this.o, this.o,
            this.k, this.k, this.w, this.o, this.o, this.o, this.o, this.o,
            this.k, this.w, this.o, this.o, this.o, this.o, this.o, this.o
        ];

        this.frame12 = [
            this.w, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.w, this.w, this.o, this.o, this.o, this.o, this.o, this.o,
            this.k, this.w, this.w, this.o, this.o, this.o, this.o, this.o,
            this.k, this.k, this.w, this.o, this.o, this.o, this.o, this.o,
            this.k, this.w, this.w, this.o, this.o, this.o, this.o, this.o,
            this.w, this.w, this.k, this.o, this.o, this.o, this.o, this.o,
            this.w, this.k, this.o, this.o, this.o, this.o, this.o, this.o,
            this.w, this.o, this.o, this.o, this.o, this.o, this.o, this.o
        ];

        this.frame13 = [
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.k, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.w, this.k, this.o, this.o, this.o, this.o, this.o, this.o,
            this.w, this.w, this.o, this.o, this.o, this.o, this.o, this.o,
            this.k, this.w, this.o, this.o, this.o, this.o, this.o, this.o,
            this.w, this.w, this.o, this.o, this.o, this.o, this.o, this.o,
            this.w, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o
        ];

        this.frame14 = [
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.w, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.w, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.k, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.w, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o,
            this.o, this.o, this.o, this.o, this.o, this.o, this.o, this.o
        ];

        this.ballFrames = [
            this.frame0, this.frame1, this.frame2, this.frame3,
            this.frame4, this.frame5, this.frame6, this.frame7,
            this.frame8, this.frame9, this.frame10, this.frame11,
            this.frame12, this.frame13, this.frame14
        ];
    }
}

module.exports = Frames;