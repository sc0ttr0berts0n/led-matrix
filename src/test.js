var LedMatrix = require('node-rpi-rgb-led-matrix');
var matrix = new LedMatrix();

var x = 0;
var y = 0;
var color = {
    r: 64,
    g: 64,
    b: 64
};

function animate() {
    matrix.setPixel(x, y, color.r, color.g, color.b);
    x = x + 1;
    if (x >= 32) {
        x = 0;
        y = y + 1;
    }
}

var drawLoop = setInterval(animate, 1000 / 60);
