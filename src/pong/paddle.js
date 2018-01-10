function Paddle(ball, display, x, y, w, h, r, g, b) {
    const self = this;

    this.x = x;
    this.y = y;
    this.dim = {
        w: w,
        h: h
    };
    this.color = {
        r: r,
        b: b,
        g: g
    };
    this.draw = function() {
        display.drawRect(
            this.x,
            this.y,
            this.dim.w,
            this.dim.h,
            this.color.r,
            this.color.g,
            this.color.b
        );
    };
    this.update = function(y) {
        this.y = ball.y - this.dim.h / 2;

        let bottomEdge = this.y + this.dim.h;
        let topEdge = this.y;
        if (bottomEdge > display.dim.h) {
            this.y = display.dim.h - this.dim.h;
        }
        if (topEdge < 0) {
            this.y = 0;
        }
        this.draw();
    };
}

module.exports = Paddle;
