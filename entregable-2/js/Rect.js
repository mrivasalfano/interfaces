class Rect extends Figure {
    constructor(x, y, width, height, canvas) {
        super(x, y, canvas);
        this.width = width;
        this.height = height;
    }

    hit(x, y) {
        return (x > this.x1) && (x < this.x + this.width) && (y > this.y1) && (y < this.y2 + this.height);
    }

    draw(style) {
        this.context.beginPath();
        this.context.fillStyle = style;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.closePath();
    }

    drawWithBorder(style) {
        this.context.beginPath();
        this.context.fillStyle = style;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.stroke();
        this.context.closePath();
    }
}