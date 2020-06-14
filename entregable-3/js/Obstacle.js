class Obstacle {
    constructor(up, down, bodyHeight) {
        this.bodyHeight = bodyHeight;
        this.upDiv = up;
        this.downDiv = down;
        this.upHeight = parseInt(window.getComputedStyle(this.upDiv, null).getPropertyValue('height').split('px')[0]);
        this.downHeight = parseInt(window.getComputedStyle(this.downDiv, null).getPropertyValue('height').split('px')[0]);
        this.left = parseInt(window.getComputedStyle(this.upDiv, null).getPropertyValue('left').split('px')[0]);
        this.width = parseInt(window.getComputedStyle(this.upDiv, null).getPropertyValue('width').split('px')[0]);
    }

    collision(player) {
        let playerSize = (player.getLeft() + player.getWidth());

        if((playerSize >= this.left) && (playerSize <= this.left + this.width)) 
            return (player.getPosition() <= this.upHeight) || ((player.getPosition() + player.getHeight()) >= (this.bodyHeight - this.downHeight)); //falta 
        else 
            return false;
    }

    // setPosition() {

    // }

    update() {
        this.left -= 5;
        this.upDiv.style.left = this.left + 'px';
        this.downDiv.style.left = this.left + 'px';
    }
}