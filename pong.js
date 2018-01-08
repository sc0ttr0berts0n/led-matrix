var LedDisplay = require("./display");
var display = new LedDisplay();

var PongBall = require("./pong-ball");
var ball = new PongBall(display, 2, 2, 2, -1.2, 1, 128, 64, 128);

// var onExit = require("./on-exit");

function init() {
    display.init();
    var drawLoop = setInterval(animate, 1000 / 24);
}

function animate() {
    ball.update();
    display.paint();
}

init();
