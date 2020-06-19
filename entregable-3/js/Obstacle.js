class Obstacle {
    constructor(up, down, width, left, bodyHeight, startLeft) {
        this.upDiv = up;
        this.downDiv = down;
        this.upHeight;
        this.downHeight;
        this.left = left;
        this.originalLeft = this.left;
        this.startLeft = startLeft;
        this.width = width;
        this.randomValues = [10, 20, 30, 40, 50];
        this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        this.bodyHeight = bodyHeight * 100 / window.innerHeight; //transformación del height en px a vh
        this.setStyle();
    }

    setStyle() {
        //creo altos random para el obstáculo
        //y asigno las medidas y posiciones
        this.random();

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
        //vuelvo a la posición original que 
        //sería la del obstáculo 1 así siempre
        //salen al mismo tiempo y quedan a distancia correcta
        if((this.left-0.3) <= (0 - this.width)) {
            this.random();
            this.left = this.startLeft;
            this.setStyle();
        }
        else 
            this.left -= 0.3;
        
        this.upDiv.style.left = this.left + 'vw';
        this.downDiv.style.left = this.left + 'vw';
    }

    restart() {
        this.left = this.originalLeft;
    }

    random() {
        //posicion random del arreglo de posibles valores
        let randomPos = Math.floor(Math.random() * (this.randomValues.length));
        //busco el valor en el arreglo y se lo asigno al obstáculo de arriba
        this.upHeight = this.randomValues[randomPos];
        //el obstáculo de abajo calcula su alto para quedar proporcionado
        this.downHeight = (60 - this.upHeight);
    }
}