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

        return [x+1, column];
    }

    checkWin(position) {
        let row = position[0];
        let col = position[1];
        let color = this.slots[row][col].getColor();
        
        return (this.matchCross(row, col, color) || this.matchVertical(row, col, color) || this.matchHorizontal(row, col, color));          
    }

    matchCross(row, col, color) {
        let count = 0;
        let tmp = 0;
        let keepGoing = true;

        //me fijo si matchea cruzado hacia la derecha es decir
        // [][][][X]
        // [][][X][]
        // [][X][][]
        // [X][][][]

        while(keepGoing) {
            tmp++;

            if (this.match(row-tmp, col+tmp, color))
                count++;
            else
                keepGoing = false;
        }

        if (count == 3)
            return true;
        else {
            keepGoing = true;
            tmp = 0;

            while(keepGoing) {
                tmp++;

                if (this.match(row+tmp, col-tmp, color))
                    count++;
                else
                    keepGoing = false;
            }

            if (count == 3)
                return true;
        }

        //me fijo si matchea cruzado hacia la izquierda es decir
        // [X][][][]
        // [][X][][]
        // [][][X][]
        // [][][][X]
        
        count = 0;
        tmp = 0;
        keepGoing = true;

        while(keepGoing) {
            tmp++;

            if (this.match(row-tmp, col-tmp, color))
                count++;
            else
                keepGoing = false;
        }

        if (count == 3)
            return true;
        else {
            keepGoing = true;
            tmp = 0;

            while(keepGoing) {
                tmp++;

                if (this.match(row+tmp, col+tmp, color))
                    count++;
                else
                    keepGoing = false;
            }

            if (count == 3)
                return true;
            else
                return false;
        }
    }

    matchHorizontal(row, col, color) {
        let count = 0;
        let tmp = 0;
        let keepGoing = true;

        while(keepGoing) {
            if (this.match(row, col+(tmp+=1), color))
                count++;
            else
                keepGoing = false;
        }

        if (count == 3)
            return true;
        else {
            keepGoing = true;
            tmp = 0;

            while(keepGoing) {
                if (this.match(row, col-(tmp+=1), color))
                    count++;
                else
                    keepGoing = false;
            }

            if (count == 3)
                return true;
            else
                return false;
        }
    }

    matchVertical(row, col, color) {
        let count = 0;
        let tmp = 0;
        let keepGoing = true;

        while(keepGoing) {
            if (this.match(row+(tmp+=1), col, color))
                count++;
            else
                keepGoing = false;
        }

        if (count == 3)
            return true;
        else
            return false;
    }

    match(row, col, color) {
        if (this.inside(row, col)) {
            return (this.slots[row][col].getColor() == color);
        }
    }

    inside(row, col) {
        return (row >= 0 && row <= this.slots.length-1) && (col >= 0 && col <= this.slots[0].length-1);
    }
}