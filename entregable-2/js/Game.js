class Game {
    constructor(nameP1, nameP2, canvas) {
        // this.player1 = new Player(nameP1);
        // this.player2 = new Player(nameP2);
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.board = new Board(7, 6, this.canvas);
        this.positionMatrix;
        this.chipsP1 = [];
        this.chipsP2 = [];
        this.turn = 1;
        this.draggingId = -1;
        this.slots = this.createSlots();
    }

    createSlots() {
        let arr = [];
        let tmp = 370;

        arr.push(new Slot(tmp, 0, tmp+=90, 85));
        arr.push(new Slot(tmp, 0, tmp+=90, 85));
        arr.push(new Slot(tmp, 0, tmp+=90, 85));
        arr.push(new Slot(tmp, 0, tmp+=90, 85));
        arr.push(new Slot(tmp, 0, tmp+=90, 85));
        arr.push(new Slot(tmp, 0, tmp+=90, 85));
        arr.push(new Slot(tmp, 0, tmp+=90, 85));

        return arr;
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
        // let chip1 = new Image();
        // chip1.src = './img/chip1.png';

        // chip1.onload = this.drawChips(chip1, 130, 200);

        // let chip2 = new Image();
        // chip2.src = './img/chip2.png';

        // chip2.onload = this.drawChips(chip2, 1150, 200);
        let tmp = 200;

        for (let i = 0; i < 21; i++) {
            let chip = new Circle(130, tmp+=15, 35, this.canvas);
            this.chipsP1.push(chip);  
        }

        tmp = 200;

        for (let i = 0; i < 21; i++) {
            let chip = new Circle(1150, tmp+=15, 35, this.canvas);
            this.chipsP2.push(chip);  
        }

        for (let i = this.chipsP1.length-1; i > 0; i--) {
            this.chipsP1[i].drawWithBorder('red');
            this.chipsP2[i].drawWithBorder('blue');
        }



        this.context.font = 'bold 50px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText('Jugador 1', 50, 100);
        this.context.fillText('Jugador 2', 1050, 100);
    }

    checkHit(e) {
        if (this.turn == 1) {
            let i = 0;
            let length = this.chipsP1.length-1;
            let found = false;

            while (!found && i < length) {
                if (this.chipsP1[i].hit(e.layerX, e.layerY)) {
                    found = true;
                    this.draggingId = i;
                }

                i++;
            }
        }
        else {
            let i = 0;
            let length = this.chipsP1.length-1;
            let found = false;

            while (!found && i < length) {
                if (this.chipsP2[i].hit(e.layerX, e.layerY)) {
                    found = true;
                    this.draggingId = i;
                }

                i++;
            }
        }
    }

    detectUser() {
        this.canvas.addEventListener('mousedown', e => {
            this.checkHit(e);
        });

        this.canvas.addEventListener('mousemove', e => {
            if (this.turn == 1) {
                if (this.draggingId != -1) {
                    this.chipsP1[this.draggingId].setPosition(e.layerX, e.layerY);
                    
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.reDraw();
                }
            }
            else {
                if (this.draggingId != -1) {
                    this.chipsP2[this.draggingId].setPosition(e.layerX, e.layerY);
                    
                    this.chipsP2.forEach(chip => {
                        chip.drawWithBorder('blue');
                    });
                }
            }
        });
        
        this.canvas.addEventListener('mouseup', e => {
            let i = 0;
            let length = this.slots.length-1;
            let inside = false;

            while (!inside && i < length) {
                if (this.slots[i].inside(e.layerX, e.layerY)) {
                    inside = true;

                    this.chipsP1.splice(this.draggingId, 1);

                    this.reDraw();
                }
                
                i++;
            }
            this.draggingId = -1;
        });
    }

    reDraw() {
        let background = new Rect(0, 0, this.canvas.width, this.canvas.height, this.canvas);
        background.draw('rgba(120, 120, 120, 255)');

        this.positionMatrix = this.board.draw();

        for (let i = this.chipsP1.length-1; i > 0; i--) {
            this.chipsP1[i].drawWithBorder('red');
            this.chipsP2[i].drawWithBorder('blue');
        }

        this.context.font = 'bold 50px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText('Jugador 1', 50, 100);
        this.context.fillText('Jugador 2', 1050, 100);
    }

    // drawChips(img, x, y) {
    //     for (let i = 0; i < 21; i++) {
    //         this.context.drawImage(img, x, y+=15, 60, 60);
    //     }
    // }
}