class Circle extends Figure {
    constructor(x, y, radius, canvas) {
        super(x, y, canvas);
        this.radius = radius;
    }

    hit(x, y) {

    }

    draw(style) {
        this.context.beginPath();
        this.context.fillStyle = style;
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill(); 
    }

    drawImage(img) {

    }
}