const helper = require('../util/helper');
const yargs = require('yargs');
const LedMatrixSimulator = require('../display/led-matrix-simulator');
var LedMatrix = !!yargs.argv.simulator ? null : require('node-rpi-rgb-led-matrix');
var matrix = null;

// Determine whether to go out to the LED Panel or the simulator
if (!!yargs.argv.simulator) {
    matrix = new LedMatrixSimulator(16, 16);
} else {
    matrix = new LedMatrix();
}

const LedDisplay = function() {
    this.dim = {
        w: matrix.getWidth(),
        h: matrix.getHeight()
    };
    this.grid = null;
    this.init = function() {
        this.reset();
    };
    this.reset = function() {
        this.grid = [];
        for (let i = 0; i < this.dim.w * this.dim.h; i++) {
            let x = i % this.dim.w;
            let y = Math.floor(i / this.dim.h);
            this.grid.push(new Led(x, y, 0, 0, 0));
        }
    };
    this.updatePixel = function(xCord, yCord, r, g, b) {
        // Declare Pixel Unsafe to draw until verified
        let safeToDraw = false;

        // Convert 2d cordinate to 1d array cordiante
        let target = yCord * this.dim.w + xCord;

        // Check if Pixel is on the board
        if (
            xCord >= 0 &&
            xCord < this.dim.w &&
            yCord >= 0 &&
            yCord < this.dim.h
        ) {
            safeToDraw = true;
        }

        // Check for out of range pixels
        if ((target <= -1 || target >= this.grid.length) && safeToDraw) {
            // throw new Error(`Pixel value [${target}] out of range`);
            // safeToDraw = false;
        }

        // assign colors
        if (safeToDraw) {
            this.grid[target].color.r = r;
            this.grid[target].color.g = g;
            this.grid[target].color.b = b;
        }
    };
    this.drawRect = function(x, y, w, h, r, g, b) {
        // Ensure only integers make it past here
        helper.ensureInteger(arguments);

        // create a grid and draw each pixel
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                this.updatePixel(x + i, y + j, r, g, b);
            }
        }
    };
    this.refresh = function() {
        for (let i = 0; i < this.grid.length; i++) {
            matrix.setPixel(
                this.grid[i].cord.x,
                this.grid[i].cord.y,
                this.grid[i].color.r,
                this.grid[i].color.g,
                this.grid[i].color.b
            );
        }
    };
    this.clear = function() {
        this.drawRect(0, 0, 32, 32, 0, 0, 0);
    };
};

const Led = function(x, y, r, g, b) {
    this.cord = { x: x, y: y };
    this.color = {
        r: r,
        g: g,
        b: b
    };
};

module.exports = LedDisplay;
