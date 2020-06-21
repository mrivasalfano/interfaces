class Obstacle {
    constructor(up, down, width, left, bodyHeight, startLeft) {
        this.upDiv = up;
        this.downDiv = down;
        this.upHeight;
        this.downHeight;
        this.overcomed = false;
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

    overcome(playerLeft) {
        //si no fue sobrepasado me fijo si su left más su width
        //(pasandolo a pixeles), es menor al left del jugador, por lo
        //tanto el obstáculo fue sobrepasado
        if (!this.overcomed) {
            this.overcomed = (((this.left + this.width) * this.vw / 100) < playerLeft);
            return this.overcomed;
        }
        //si ya fue sobrepasado retorno false porque si no todo el tiempo
        //va a decir que fue sobrepasado y seguiría sumando puntos
        else
            return false;
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

        //ahora lo hago desde css
        // this.upDiv.style.top = 0 + 'vh';
        // this.downDiv.style.top = (100 - this.downHeight) + 'vh';
    }

    collision(player) {
        //como los obstáculos trabajan con medidas viewport
        //transformo las medidas en px del pj a viewport haciendo
        //regla de 3 simples con las medidas de la pantalla
        //tengo el problema que si achico o agrando la pantalla
        //las medidas cambian y choco antes o después
        let playerLeft = player.getLeft() * 100 / this.vw;
        let playerRight = player.getRight() * 100 / this.vw;
        let playerTop = player.getTop() * 100 / this.vh;
        let playerBottom = player.getBottom() * 100 / this.vh;

        if ((this.left + this.width) >= playerLeft && this.left <= playerRight)
            return (playerTop <= this.upHeight) || (playerBottom >= (this.bodyHeight - this.downHeight));
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
            this.overcomed = false;
        }
        else 
            this.left -= 0.3;
        
        this.upDiv.style.left = this.left + 'vw';
        this.downDiv.style.left = this.left + 'vw';
    }

    restart() {
        this.left = this.originalLeft;
        this.overcomed = false;
    }

    random() {
        //posicion random del arreglo de posibles valores
        let randomPos = Math.floor(Math.random() * (this.randomValues.length));
        //busco el valor en el arreglo y se lo asigno al obstáculo de arriba
        this.upHeight = this.randomValues[randomPos];
        //el obstáculo de abajo calcula su alto para quedar proporcionado
        this.downHeight = (60 - this.upHeight);
    }

    getRight() {
        return this.left + this.width;
    }
}