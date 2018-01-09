function PongBall(display, x, y, size, velX, velY, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = {
        r: r,
        b: b,
        g: g
    };
    this.vel = {
        x: velX,
        y: velY
    };
    this.move = function() {
        // right edge detection
        if (this.x + this.size >= display.dim.w - 2) {
            this.vel.x = -this.vel.x;
        }
        // bottom edge detection
        if (this.y + this.size >= display.dim.w) {
            this.vel.y = -this.vel.y;
        }
        // left edge detection
        if (this.x <= 0 + 2) {
            this.vel.x = -this.vel.x;
        }
        // top edge detection
        if (this.y <= 0) {
            this.vel.y = -this.vel.y;
        }
        this.x += this.vel.x;
        this.y += this.vel.y;
    };
    this.draw = function() {
        display.drawRect(
            this.x,
            this.y,
            this.size,
            this.size,
            this.color.r,
            this.color.g,
            this.color.b
        );
    };
    this.update = function() {
        this.move();
        this.draw();
    };
}

module.exports = PongBall;
