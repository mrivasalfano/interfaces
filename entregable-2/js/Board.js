class Board {
    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.background = this.createBackground();
        this.slots = this.createSlots();
    }

    createBackground() {
        return new Rect(370, 85, 600, 510, this.canvas);
    }

    createSlots() {
        let matrix = [];
        let startX = 430;
        let startY = 140;

        for (let y=0; y<480; y+=80) {
            let row = [];
        
            for (let x=0; x<560; x+=80) {
                let circle = new Circle(startX + x, startY + y, 35, 'rgb(250, 250, 150)', this.canvas);
                row.push(circle);
            }    

            matrix.push(row);
        }

        return matrix;
    }

    draw() {
        //dibuja el fondo amarillo
        this.background.draw('rgba(255, 196, 0, 255)');

        //dibujo los círculos/slots
        for (let i = 0; i < this.slots.length; i++) {
            for (let j = 0; j < this.slots[i].length; j++) {
                this.slots[i][j].draw();
            }
            
        }   
    }

    setPosition(column, color) {
        let x = this.slots.length-1;
        let find = false;

        while (!find && x >= 0) {
            if (this.slots[x][column].isFree()) {
                this.slots[x][column].setStyle(color);
                this.slots[x][column].setTaken();
                find = true;
            }

            x--;
        }
    }
}