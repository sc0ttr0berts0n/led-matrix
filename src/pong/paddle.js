const Color = require('../util/color');
const Vec2 = require('../util/vec2');

function Paddle(game, ball, x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.dim = {
        w: w,
        h: h
    };
    this.color = new Color(color)
    this.draw = function() {
        game.display.drawRect(
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
        this.y = ball.pos.y - this.dim.h / 2;

        let bottomEdge = this.y + this.dim.h;
        let topEdge = this.y;
        if (bottomEdge > game.display.dim.h) {
            this.y = game.display.dim.h - this.dim.h;
        }
        if (topEdge < 0) {
            this.y = 0;
        }
        this.draw();
    };
}

module.exports = Paddle;
