const LedDisplay = require("./display");
const display = new LedDisplay();

const PongBall = require("./pong-ball");
const ball = new PongBall(display, 2, 2, 2, -1.2, 1, 32, 16, 32);

const Paddle = require("./paddle");
const leftPaddle = new Paddle(display, 0, 0, 2, 8);

function drawMidfieldLine() {
    for (let i = 0; i < display.dim.h; i = i + 4) {
        display.drawRect(15, i, 2, 2, 4, 2, 4);
    }
}

function init() {
    display.init();
    var drawLoop = setInterval(animate, 1000 / 24);
}

function animate() {
    display.clear();
    drawMidfieldLine();
    ball.update();
    display.paint();
}

init();
