const Vec2 = function(x = null, y = null) {
    this.x = x;
    this.y = y;
    
    this.set = function(x, y) {
        this.x = x;
        this.y = y;
    }
}

module.exports = Vec2;