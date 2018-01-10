const yargs = require('yargs');
const chalk = require('chalk');
const log = require('single-line-log').stdout;

const LedMatrixSimulator = function(w, h) {
    const self = this;
    this.enableSimulator = !!yargs.argv.simulator;
    this.w = w;
    this.h = h;
    this.logBuffer = {
        maxLine: this.h - 1,
        currentLine: null,
        data: []
    };
    this.getWidth = function() {
        return this.w;
    };
    this.getHeight = function() {
        return this.h;
    };
    this.setPixel = function(x, y, r, g, b) {
        if (self.enableSimulator) {
            // Initialize current line to y
            self.logBuffer.currentLine =
                self.logBuffer.currentLine === null
                    ? y
                    : self.logBuffer.currentLine;

            // Initialize new line to false
            let newLine = false;

            // Check to see if new line encountered
            if (self.logBuffer.currentLine !== y) {
                newLine = true;
                self.logBuffer.currentLine = y;
            }

            // Push out the data to the buffer
            self.logBuffer.data.push([r, g, b, newLine]);

            // Check to see if the array is full, and if so, print the buffer
            if (self.logBuffer.data.length === self.w * self.h) {
                self.print(self.logBuffer.data);
                self.logBuffer.data = [];
            }
        }
        this.print = function(data) {
            let screen = '';
            data.forEach(function(key) {
                newLineCheck = key[3] ? '\n' : '';
                screen += chalk.bgRgb(key[0], key[1], key[2])(
                    newLineCheck + '  '
                );
            });
            screen += '\n\n';
            log(screen);
        };
    };
};

module.exports = LedMatrixSimulator;
