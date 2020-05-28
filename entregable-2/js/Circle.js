class Circle extends Figure {
    constructor(x, y, radius, canvas) {
        super(x, y, canvas);
        this.radius = radius;
        this.free = true;
    }

    hit(x, y) {
        return (Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) < Math.pow(this.radius, 2);
    }

    draw(style) {
        this.context.beginPath();
        this.context.fillStyle = style;
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill(); 
    }

    drawWithBorder(style) {
        this.context.beginPath();
        this.context.fillStyle = style;
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    isFree() {
        return this.free;
    }

    setTaken() {
        this.free = false;
    }
}