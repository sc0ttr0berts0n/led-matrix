var LedDisplay = require("./display");
var onExit = require("./on-exit");

var display = new LedDisplay();

var x = 0;
var y = 0;
var color = {
    r: 64,
    g: 64,
    b: 64
};

function init() {
    display.init();
}

function animate() {
    display.clear();
    display.updatePixel(x, y, color.r, color.g, color.b);
    display.paint();
    x = x + 1;
    if (x >= 32) {
        x = 0;
        y = y + 1;
    }
}

init();
var drawLoop = setInterval(animate, 1000 / 60);
