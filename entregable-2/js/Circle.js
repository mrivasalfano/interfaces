class Circle extends Figure {
    constructor(x, y, radius, style, canvas) {
        super(x, y, canvas);
        this.radius = radius;
        this.style = style;
        this.free = true;
        this.originalX = x;
        this.originalY = y;
    }

    hit(x, y) {
        return (Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) < Math.pow(this.radius, 2);
    }

    originalPosition() {
        this.x = this.originalX;
        this.y = this.originalY;
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.style;
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill(); 
    }

    drawWithBorder() {
        this.context.beginPath();
        this.context.fillStyle = this.style;
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

    setStyle(style) {
        this.style = style;
    }

    setTaken() {
        this.free = false;
    }

    getColor() {
        return this.style;
    }
}