const helper = require('../util/helper');
const Color = require('../util/color');
const Vec2 = require('../util/vec2');

function PongBall(game, size, velMax, color) {
    this.pos = new Vec2();
    this.size = size;
    this.color = new Color(color);
    this.vel = new Vec2();
    this.speed = 0.5;

    this.init = function() {
        this.reset();
    };
    this.reset = function() {
        this.pos.x = game.display.dim.w / 2 - 1 + Math.random();
        this.pos.y = helper.randInt(0, game.display.dim.h - 1);

        // throw ball at fixed speed in random direction
        let startAngles = [];

        // Generate angles in 15 degree steps
        for (let i = 0; i <= 360; i = i + 15) {
            // Dont add angles that would result in x or y being 0
            if (i % 90 !== 0) {
                startAngles.push(i);
            }
        }
        // Pick a random Angle from the array
        let randomAngle = helper.randInt(0, startAngles.length - 1);
        let angle = helper.toRadians(startAngles[randomAngle]);
        this.vel.x = this.speed * Math.cos(angle);
        this.vel.y = this.speed * Math.sin(angle);
    };
    this.move = function() {
        // right edge detection
        if (
            this.pos.x + this.size >=
            game.display.dim.w - game.default.minWidth
        ) {
            this.vel.x = -this.vel.x;
        }
        // bottom edge detection
        if (this.pos.y + this.size >= game.display.dim.w) {
            this.vel.y = -this.vel.y;
        }
        // left edge detection
        if (this.pos.x <= game.default.minWidth) {
            this.vel.x = -this.vel.x;
        }
        // top edge detection
        if (this.pos.y <= 0) {
            this.vel.y = -this.vel.y;
        }
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    };
    this.draw = function() {
        game.display.drawRect(
            this.pos.x,
            this.pos.y,
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
