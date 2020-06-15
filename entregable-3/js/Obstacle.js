class Obstacle {
    constructor(up, down, bodyHeight) {
        this.bodyHeight = bodyHeight;
        this.upDiv = up;
        this.downDiv = down;
        this.upHeight = parseInt(window.getComputedStyle(this.upDiv, null).getPropertyValue('height').split('px')[0]);
        this.downHeight = parseInt(window.getComputedStyle(this.downDiv, null).getPropertyValue('height').split('px')[0]);
        this.left = parseInt(window.getComputedStyle(this.upDiv, null).getPropertyValue('left').split('px')[0]);
        this.originalLeft = this.left;
        this.width = parseInt(window.getComputedStyle(this.upDiv, null).getPropertyValue('width').split('px')[0]);
    }

    collision(player) {
        if(this.left >= player.getLeft() && this.left <= (player.getLeft() + player.getWidth())) 
            return (player.getPosition() <= this.upHeight) || ((player.getPosition() + player.getHeight()) >= (this.bodyHeight - this.downHeight)); //falta 
        else 
            return false;
    }

    update() {
        if((this.left-5) <= (0 - this.width))
            this.left = this.originalLeft;
        else
            this.left -= 5;
        this.upDiv.style.left = this.left + 'px';
        this.downDiv.style.left = this.left + 'px';
    }
}