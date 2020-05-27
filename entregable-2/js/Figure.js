class Figure {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }
}