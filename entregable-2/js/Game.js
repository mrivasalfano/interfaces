class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.chipsP1;
        this.chipsP2;
        this.countChips;
        this.turn;
        this.draggingId = -1;
        this.slots = this.createSlots();
    }

    drawTurnIndicator() {
        let x;
        let xTitle;
        let y = 20;
        let w = 290;
        let h = 130;

        if (this.turn == 1) {
            x = 25;
            xTitle = 125;
        }
        else {
            x = 1030;
            xTitle = 1130;
        }

        let rect = new Rect(x, y, w, h, this.canvas);
        rect.drawWithBorder('rgba(230, 255, 0, 0.8)');

        this.context.font = 'bold 18px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText('Su turno', xTitle, 50);
    }

    createSlots() {
        //crea los lugares donde van a entrar las fichas
        //son invisibles porque me sirven para detectar
        //si la ficha se solto en una columna

        let arr = [];
        let x = 390;
        let width = 80;
        let height = 110;

        arr.push(new Rect(x, 0, width, height, this.canvas));
        arr.push(new Rect(x+=width, 0, width, height, this.canvas));
        arr.push(new Rect(x+=width, 0, width, height, this.canvas));
        arr.push(new Rect(x+=width, 0, width, height, this.canvas));
        arr.push(new Rect(x+=width, 0, width, height, this.canvas));
        arr.push(new Rect(x+=width, 0, width, height, this.canvas));
        arr.push(new Rect(x+=width, 0, width, height, this.canvas));

        return arr;
    }

    start() {
        //cantidad de fichas para usar
        this.countChips = 42;
        
        //turno del jugador 1 siempre
        this.turn = 1;

        //creo el tablero
        this.board = new Board(7, 6, this.canvas);

        this.drawStaticItems();
        
        //dibujo las fichas de los jugadores
        this.createPlayers();
    }

    drawStaticItems() {
        //fondo
        let background = new Rect(0, 0, this.canvas.width, this.canvas.height, this.canvas);
        background.draw('rgba(120, 120, 120, 255)');

        //dibujo indicador de donde meter las fichas
        //con un título
        let tmp = 335;

        for (let i = 0; i < 7; i++) {
            this.drawArrow(tmp+=80);
        }

        this.context.font = 'bold 18px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText('Inserte las fichas por la parte superior', 505, 30);

        //creo el tablero y guardo la matriz
        //con los círculos que son los espacios
        this.board.draw();

        //dibujo el indicador del turno
        this.drawTurnIndicator();
    }

    drawArrow(x) {
        this.context.fillStyle = "#222222";

        this.context.beginPath();
        this.context.moveTo(x, 50);
        this.context.lineTo(x+30, 50);
        this.context.lineTo(x+15, 70);
        this.context.closePath();

        this.context.fill();
    }

    createPlayers() {
        //vacío / inicializo los arreglos de fichas de cada jugador
        this.chipsP1 = [];
        this.chipsP2 = [];

        //creo y meto las fichas que son circulos 
        let tmp = 200;

        for (let i = 0; i < 21; i++) {
            let chip = new Circle(150, tmp+=15, 35, 'red', this.canvas);
            this.chipsP1.push(chip);  
        }

        tmp = 200;

        for (let i = 0; i < 21; i++) {
            let chip = new Circle(1150, tmp+=15, 35, 'blue', this.canvas);
            this.chipsP2.push(chip);  
        }
        
        //dibujo las fichas
        for (let i = this.chipsP1.length-1; i >= 0; i--) {
            this.chipsP1[i].drawWithBorder();
            this.chipsP2[i].drawWithBorder();
        }

        //titulos de jugador 1 y 2
        this.context.font = 'bold 50px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText('Jugador 1', 50, 100);
        this.context.fillText('Jugador 2', 1050, 100);
    }

    checkHit(e) {
        //si el turno es del jugador 1 o 2
        //le pregunto a cada ficha si fue seleccionada
        //si es así guardo su id para poder manipularla
        if (this.turn == 1) {
            this.checkHitPlayer(e, this.chipsP1);
        }
        else {
            this.checkHitPlayer(e, this.chipsP2);
        }
    }

    checkHitPlayer(e, chip) {
        let i = 0;
        let length = chip.length-1;
        let found = false;

        while (!found && i < length) {
            if (chip[i].hit(e.layerX, e.layerY)) {
                found = true;
                this.draggingId = i;
            }

            i++;
        }
    }

    moveChip(e, chips) {
        chips[this.draggingId].setPosition(e.layerX, e.layerY);
                    
        this.reDraw();
    }

    deleteChip() {
        if (this.turn == 1) {
            this.chipsP1.splice(this.draggingId, 1);
        }
        else {
            this.chipsP2.splice(this.draggingId, 1);
        }    
    }

    detectUser() {
        //detecta el click y movimiento del mouse del usuario
        this.canvas.addEventListener('mousedown', e => {
            this.checkHit(e);               
        });

        this.canvas.addEventListener('mousemove', e => {
            //si es el turno del jugador 1 o 2
            //si hay una ficha seleccionada le cambio la
            //posicion a la posicion del mouse y la redibujo
            if (this.draggingId != -1) {
                if (this.turn == 1) {
                    this.moveChip(e, this.chipsP1);
                }
                else {
                    this.moveChip(e, this.chipsP2);
                }
            }
        });

        this.canvas.addEventListener('mouseup', e => {
            //si hay una ficha seleccionada
            if (this.draggingId != -1) {
                //me fijo si la ficha se soltó en un slot
                //es decir en una de las columnas
                let column = 0;
                let length = this.slots.length-1;
                let inside = false;
    
                while (!inside && column <= length) {
                    if (this.slots[column].hit(e.layerX, e.layerY)) {
                        inside = true;
                    }
                    
                    column++;
                }
                
                //si está dentro de una columna
                if (inside) {
                    let color;
                    let turnChange;
                    
                    //según si es el pj 1 o 2 cambio
                    //el color y turno
                    if (this.turn == 1) {
                        color = 'red';
                        turnChange = 2;
                    }
                    else {
                        color = 'blue';
                        turnChange = 1;
                    }
                    
                    this.putAndCheckWin(column-1, color, turnChange);
                }
                //si no la vuelvo a su posición original
                else {
                    this.originalPosition();
                }
    
                //indico que no se está agarrando ninguna ficha
                this.draggingId = -1;
            }
        });
    }

    originalPosition() {
        if (this.turn == 1)
            this.chipsP1[this.draggingId].originalPosition();
        else 
            this.chipsP2[this.draggingId].originalPosition();

        this.reDraw();
    }

    //le digo al tablero que "ponga" la ficha
    //en el lugar y que me diga si el jugador
    //gana con esa jugada. Si gana reinicio 
    //el juego
    putAndCheckWin(column, color, turnChange) {
        let position = this.board.setPosition(column, color);

        if (position != false) {
            this.deleteChip();
            
            if (this.countChips-- == 0) {
                alert('Empate!');
                this.start();
            }
            console.log(this.countChips);
            

            let win = this.board.checkWin(position);

            if(win) {
                alert('Gano el jugador ' + this.turn);
                this.start();
            }
            else {
                this.turn = turnChange;
                this.reDraw();
            }
        }
        else
            this.originalPosition();
    }

    //redibuja el tablero, fichas, jugadores, etc
    reDraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawStaticItems();
        
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