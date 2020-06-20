class Bonus {
    constructor(div) {
        this.container = div;
        this.left = parseInt(window.getComputedStyle(div, null).getPropertyValue('left').split('px')[0]);
        this.width = parseInt(window.getComputedStyle(div, null).getPropertyValue('width').split('px')[0]);
        this.top = parseInt(window.getComputedStyle(div, null).getPropertyValue('top').split('px')[0]);
        this.height = parseInt(window.getComputedStyle(div, null).getPropertyValue('height').split('px')[0]);
    }

    collision(player) {
        //si el diamante está dentro del jugador en el eje X
        if ((this.left < (player.getLeft() + player.getWidth())) && (this.left + this.width) > player.getLeft())
            //me fijo si en el eje Y está dentro
            return (this.top < (player.getPosition() + player.getHeight())) && (this.top + this.height) > player.getPosition();
    }

    update() {
        this.left -= 5;

        if (this.left <= (0 - this.width))
            this.left = 1000;
        this.container.style.left = this.left + 'px';
    }

    destroy() {
        this.container.remove();
    }
}