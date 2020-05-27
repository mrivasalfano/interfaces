class Rect extends Figure {
    constructor(x, y, width, height, canvas) {
        super(x, y, canvas);
        this.width = width;
        this.height = height;
    }

    hit(x, y) {
        
    }

    draw(style) {
        this.context.beginPath();
        this.context.fillStyle = style;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.closePath();
    }
}