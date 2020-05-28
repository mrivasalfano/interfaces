class Game {
    constructor(nameP1, nameP2, canvas) {
        // this.player1 = new Player(nameP1);
        // this.player2 = new Player(nameP2);
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.board = new Board(7, 6, this.canvas);
        this.chipsP1 = [];
        this.chipsP2 = [];
        this.turn = 1;
        this.draggingId = -1;
        this.slots = this.createSlots();
    }

    createSlots() {
        let arr = [];
        let x = 390;
        let width = 80;

        arr.push(new Rect(x, 0, width, 85, this.canvas));
        arr.push(new Rect(x+=width, 0, width, 85, this.canvas));
        arr.push(new Rect(x+=width, 0, width, 85, this.canvas));
        arr.push(new Rect(x+=width, 0, width, 85, this.canvas));
        arr.push(new Rect(x+=width, 0, width, 85, this.canvas));
        arr.push(new Rect(x+=width, 0, width, 85, this.canvas));
        arr.push(new Rect(x+=width, 0, width, 85, this.canvas));

        return arr;
    }

    start() {
        //fondo
        let background = new Rect(0, 0, this.canvas.width, this.canvas.height, this.canvas);
        background.draw('rgba(120, 120, 120, 255)');

        //creo el tablero y guardo la matriz
        //con los círculos que son los espacios
        this.board.draw();

        //dibujo las fichas de los jugadores
        this.createPlayers();
    }

    createPlayers() {
        let tmp = 200;

        for (let i = 0; i < 21; i++) {
            let chip = new Circle(130, tmp+=15, 35, 'red', this.canvas);
            this.chipsP1.push(chip);  
        }

        tmp = 200;

        for (let i = 0; i < 21; i++) {
            let chip = new Circle(1150, tmp+=15, 35, 'blue', this.canvas);
            this.chipsP2.push(chip);  
        }
        
        for (let i = this.chipsP1.length-1; i >= 0; i--) {
            this.chipsP1[i].drawWithBorder();
            this.chipsP2[i].drawWithBorder();
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
            let length = this.chipsP2.length-1;
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
                    
                    this.reDraw();
                }
            }
            else {
                if (this.draggingId != -1) {
                    this.chipsP2[this.draggingId].setPosition(e.layerX, e.layerY);
                    
                    this.reDraw();
                }
            }
        });

        this.canvas.addEventListener('mouseup', e => {
            if (this.draggingId != -1) {
                let column = 0;
                let length = this.slots.length-1;
                let inside = false;
    
                while (!inside && column <= length) {
                    if (this.slots[column].hit(e.layerX, e.layerY)) {
                        inside = true;
                        
                        if (this.turn == 1) {
                            this.chipsP1.splice(this.draggingId, 1);
                        }
                        else {
                            this.chipsP2.splice(this.draggingId, 1);
                        }    
                    }
                    
                    column++;
                }
                
                if (inside) {
                    let color;
                    let turnChange;
    
                    if (this.turn == 1) {
                        color = 'red';
                        turnChange = 2;
                    }
                    else {
                        color = 'blue';
                        turnChange = 1;
                    }
                    
                    this.board.setPosition(column-1, color);
                    this.reDraw();
                    this.turn = turnChange;
                }
    
                this.draggingId = -1;
            }
        });
    }

    reDraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let background = new Rect(0, 0, this.canvas.width, this.canvas.height, this.canvas);
        background.draw('rgba(120, 120, 120, 255)');

        this.board.draw();
        
        for (let i = this.chipsP1.length-1; i >= 0; i--) {
            this.chipsP1[i].drawWithBorder('red');
        }
        
        for (let i = this.chipsP2.length-1; i >= 0; i--) {
            this.chipsP2[i].drawWithBorder('blue');
        }

        this.context.font = 'bold 50px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText('Jugador 1', 50, 100);
        this.context.fillText('Jugador 2', 1050, 100);
    }
}