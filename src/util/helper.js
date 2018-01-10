const helper = function() {};

helper.prototype.ensureInteger = array => {
    for (let i = 0; i < array.length; i++) {
        if (!Number.isInteger(array[i])) {
            array[i] = Math.round(array[i]);
        }
    }
};

helper.prototype.randInt = (min, max = null) => {
    if (max) {
        return Math.floor(Math.random() * (max - min)) + min;
    } else {
        return Math.floor(Math.random() * min);
    }
};

helper.prototype.randColorValue = () => {
    return randInt(255);
};

module.exports = new helper();
