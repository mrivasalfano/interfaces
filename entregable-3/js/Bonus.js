class Bonus {
    constructor(div) {
        this.container = div;
        this.minLeft = (108 * window.innerWidth / 100) + 100; //el left del primer obstaculo en px
        this.maxLeft = this.minLeft + (8 * window.innerWidth / 100) + (40 * window.innerWidth / 100) - 200; //el left + el width + la distancia entre los obstaculos
        this.top;
        this.minTop = 50;
        this.maxTop = window.innerHeight - 150;
        this.width = parseInt(window.getComputedStyle(div, null).getPropertyValue('width').split('px')[0]);
        this.left;
        this.height = parseInt(window.getComputedStyle(div, null).getPropertyValue('height').split('px')[0]);
        this.random();
    }

    random() {
        this.left = Math.floor(Math.random() * (this.maxLeft - this.minLeft + 1) + this.minLeft);
        this.container.style.left = this.left + 'px';
        // this.top = Math.floor(Math.random() * this.maxTop) + this.minTop;
        this.top = Math.floor(Math.random() * (this.maxTop - this.minTop + 1) + this.minTop);
        this.container.style.top = this.top + 'px';
    }

    collision(player) {
        //si el diamante está dentro del jugador en el eje X
        if ((this.left < player.getRight()) && (this.left + this.width) > player.getLeft())
            //me fijo si en el eje Y está dentro
            return (this.top < player.getBottom()) && (this.top + this.height) > player.getTop();
    }

    update() {
        let px = (0.3 * window.innerWidth / 100);
        this.left -= Math.round(px);
        this.container.style.left = this.left + 'px';
    }

    out() {
        return this.left <= (0 - this.width);
    }

    destroy() {
        this.container.remove();
    }
}