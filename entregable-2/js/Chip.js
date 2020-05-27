class Chip{
    constructor(x, y, img, canvas) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    draw() {
        this.context.drawImage(this.img, this.x, this.y)
    }
}