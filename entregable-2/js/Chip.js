class Chip extends Figure {
    constructor(x, y, img, canvas) {
        super(x, y, canvas);
        this.image = img;
        this.free = true;
        this.originalX = x;
        this.originalY = y;
    }


    hit(x, y) {
        return (x > this.x) && (x < this.x + 70) && (y > this.y) && (y < this.y + 70)
    }

    originalPosition() {
        this.x = this.originalX;
        this.y = this.originalY;
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y, 64, 64);
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

    getImg() {
        return this.image;
    }
}