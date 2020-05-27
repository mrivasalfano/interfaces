class Game {
    constructor(nameP1, nameP2, canvas) {
        // this.player1 = new Player(nameP1);
        // this.player2 = new Player(nameP2);
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.board = new Board(7, 6, this.canvas);
        this.positionMatrix;
    }

    start() {
        //fondo
        let background = new Rect(0, 0, this.canvas.width, this.canvas.height, this.canvas);
        background.draw('rgba(120, 120, 120, 255)');

        //creo el tablero y guardo la matriz
        //con los círculos que son los espacios
        this.positionMatrix = this.board.draw();

        //dibujo las fichas de los jugadores
        this.createPlayers();

        // let background = new Image();
        // background.src = './img/background.jpeg';

        // background.onload = this.drawBackground(background);
    }

    drawBackground(img) {
        // this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        
    }

    createPlayers() {
        let chip1 = new Image();
        chip1.src = './img/chip1.png';

        chip1.onload = this.drawChips(chip1, 130, 200);

        let chip2 = new Image();
        chip2.src = './img/chip2.png';

        chip2.onload = this.drawChips(chip2, 1150, 200);

        this.context.font = 'bold 50px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText('Jugador 1', 50, 100);
        this.context.fillText('Jugador 2', 1050, 100);
    }

    

    drawChips(img, x, y) {
        for (let i = 0; i < 21; i++) {
            this.context.drawImage(img, x, y+=15, 60, 60);
        }
    }
}