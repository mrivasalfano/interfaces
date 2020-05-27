class Slot {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    inside(x, y) {
        return (x > this.x1) && (x < this.x2) && (y > this.y1) && (y < this.y2);
    }
}