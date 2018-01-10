/*jslint
node: true,
esversion: 6
*/

const LedDisplay = require('./display/display');
const PongBall = require('./pong/ball');
const Paddle = require('./pong/paddle');
const yargs = require('yargs');

function Game(color, minWidth, tickRate) {
    const self = this;
    this.animationLoop = null;
    this.default = {
        color: color,
        minWidth: minWidth,
        tickRate: tickRate
    };

    this.display = new LedDisplay();
    this.ball = new PongBall(
        this,
        this.default.minWidth,
        this.default.minWidth,
        this.default.minWidth,
        2,
        this.default.color.r,
        this.default.color.g,
        this.default.color.b
    );
    this.leftPaddle = new Paddle(
        this.ball,
        this.display,
        0,
        0,
        this.default.minWidth,
        this.default.minWidth * 4,
        this.default.color.r,
        this.default.color.g,
        this.default.color.b
    );
    this.rightPaddle = new Paddle(
        this.ball,
        this.display,
        this.display.dim.w - this.default.minWidth,
        0,
        this.default.minWidth,
        this.default.minWidth * 4,
        this.default.color.r,
        this.default.color.g,
        this.default.color.b
    );
    this.init = function() {
        this.display.init();
        this.ball.init();
        this.animationLoop = setInterval(
            this.animate,
            1000 / this.default.tickRate
        );
    };
    this.midfieldLine = {
        width: this.default.minWidth,
        draw: function() {
            for (let i = 0; i < self.display.dim.h; i = i + this.width * 2) {
                let width = self.display.dim.w / 2 - 1;
                self.display.drawRect(
                    self.display.dim.w / 2 - this.width / 2,
                    i,
                    this.width,
                    this.width,
                    self.default.color.r / 4,
                    self.default.color.g / 4,
                    self.default.color.b / 4
                );
            }
        }
    };
    this.animate = function() {
        self.display.clear();
        self.midfieldLine.draw();
        self.leftPaddle.update();
        self.rightPaddle.update();
        self.ball.update();
        self.display.refresh();
    };
}

let pong = null;

if (!!yargs.argv.simulator) {
    pong = new Game({ r: 32, g: 16, b: 32 }, 1, 30);
} else {
    pong = new Game({ r: 32, g: 16, b: 32 }, 2, 30);
}
pong.init();
