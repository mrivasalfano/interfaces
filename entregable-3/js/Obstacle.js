class Obstacle {
    constructor(up, down, width, upHeight, downHeight, left, bodyHeight) {
        this.upDiv = up;
        this.downDiv = down;
        this.upHeight = upHeight;
        this.downHeight = downHeight;
        this.left = left;
        this.originalLeft = this.left;
        this.width = width;
        this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        this.bodyHeight = bodyHeight * 100 / window.innerHeight; //transformación del height en px a vh
        this.setStyle();
    }

    setStyle() {
        this.upDiv.style.left = this.left + 'vw';
        this.downDiv.style.left = this.left + 'vw';

        this.upDiv.style.width = this.width + 'vw';
        this.downDiv.style.width = this.width + 'vw';

        this.upDiv.style.height = this.upHeight + 'vh';
        this.downDiv.style.height = this.downHeight + 'vh';

        this.upDiv.style.top = 0 + 'vh';
        this.downDiv.style.top = (100 - this.downHeight) + 'vh';
    }

    collision(player) {
        //como los obstáculos trabajan con medidas viewport
        //transformo las medidas en px del pj a viewport haciendo
        //regla de 3 simples con las medidas de la pantalla
        //tengo el problema que si achico o agrando la pantalla
        //las medidas cambian y choco antes o después
        let playerLeft = player.getLeft() * 100 / this.vw;
        let playerWidth = player.getWidth() * 100 / this.vw;
        let playerTop = player.getPosition() * 100 / this.vh;
        let playerHeight = player.getHeight() * 100 / this.vh;

        if ((this.left + this.width) >= playerLeft && this.left <= (playerLeft + playerWidth))
            return (playerTop <= this.upHeight) || ((playerTop + playerHeight) >= (this.bodyHeight - this.downHeight));
        else 
        return false;
    }

    update() {
        //si me voy fuera de la pantalla
        //vuelvo a mi posición original
        if((this.left-0.3) <= (0 - this.width))
            this.left = this.originalLeft;
        else
            this.left -= 0.3;
        
        this.upDiv.style.left = this.left + 'vw';
        this.downDiv.style.left = this.left + 'vw';
    }

    restart() {
        this.left = this.originalLeft;
    }
}