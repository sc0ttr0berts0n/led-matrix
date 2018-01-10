const helper = require('../util/helper');

function PongBall(game, x, y, size, velMax, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = {
        r: r,
        b: b,
        g: g
    };
    this.vel = {
        x: null,
        y: null,
        max: velMax
    };
    this.init = function() {
        this.reset();
    };
    this.reset = function() {
        this.x = game.display.dim.w / 2 - 1 + Math.random();
        this.y = helper.randInt(0, game.display.dim.h - 1);

        // throw ball at fixed speed in random direction
        let angle = Math.random() * (Math.PI * 2);
        this.vel.x = this.vel.max * Math.cos(angle);
        this.vel.y = this.vel.max * Math.sin(angle);

    };
    this.move = function() {
        // right edge detection
        if (this.x + this.size >= game.display.dim.w - game.default.minWidth) {
            this.vel.x = -this.vel.x;
        }
        // bottom edge detection
        if (this.y + this.size >= game.display.dim.w) {
            this.vel.y = -this.vel.y;
        }
        // left edge detection
        if (this.x <= game.default.minWidth) {
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
        game.display.drawRect(
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
