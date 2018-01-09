const LedDisplay = require("./display");

const PongBall = require("./pong-ball");

const Paddle = require("./paddle");

function Game() {
    const self = this;
    this.animationLoop;
    this.default = {
        color: {
            r: 32,
            g: 16,
            b: 32
        },
        minWidth: 2
    };

    this.display = new LedDisplay();
    this.ball = new PongBall(
        this.display,
        this.default.minWidth,
        this.default.minWidth,
        this.default.minWidth,
        -1.2,
        1,
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
        8,
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
        8,
        this.default.color.r,
        this.default.color.g,
        this.default.color.b
    );
    this.init = function() {
        this.display.init();
        this.animationLoop = setInterval(this.animate, 1000 / 24);
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

const pong = new Game();

pong.init();
