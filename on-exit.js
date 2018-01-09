var LedMatrix = require('node-rpi-rgb-led-matrix');
var matrix = new LedMatrix();

// turn off the matrix on close
process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, err) {
    matrix.clear();
    console.log('Process Ended Safely.');
    process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
