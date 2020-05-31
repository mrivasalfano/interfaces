class Chip extends Figure {
    constructor(x, y, img, canvas) {
        super(x, y, canvas);
        this.image = img;
        this.free = true;
        this.originalX = x;
        this.originalY = y;
    }


    hit(x, y) {
        // return (Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) < Math.pow(this.radius, 2);
        return (x > this.x) && (x < this.x + 70) && (y > this.y) && (y < this.y + 70)
    }

    originalPosition() {
        this.x = this.originalX;
        this.y = this.originalY;
    }

    draw() {
        // this.context.beginPath();
        // this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // this.context.closePath();
        this.context.drawImage(this.image, this.x, this.y, 70, 70);
        // this.context.fill();
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

    setImg(img) {
        this.image = img;
    }

    setTaken() {
        this.free = false;
    }

    getColor() {
        return this.style;
    }
}