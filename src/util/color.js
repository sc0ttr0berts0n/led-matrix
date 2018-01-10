const Color = function(colorObject) {
    this.r = colorObject.r;
    this.g = colorObject.g;
    this.b = colorObject.b;

    this.set = function(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

module.exports = Color;