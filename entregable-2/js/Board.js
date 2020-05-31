class Board {
    constructor(width, height, img, background, canvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.background = background;
        this.slotImg = img;
        this.slots = this.createSlots();
    }

    //crea y retorna una matriz con los círculos
    //que representan los espacios para las fichas
    createSlots() {
        let matrix = [];
        let startX = 402;
        let startY = 115;

        for (let y=0; y<480; y+=80) {
            let row = [];
        
            for (let x=0; x<560; x+=80) {
                let chip = new Chip(startX + x, startY + y, this.slotImg, this.canvas);
                row.push(chip);
            }    

            matrix.push(row);
        }

        return matrix;
    }

    draw() {
        this.context.drawImage(this.background, 370, 85, 615, 500);

        //dibujo los círculos/slots
        for (let i = 0; i < this.slots.length; i++) {
            for (let j = 0; j < this.slots[i].length; j++) {
                this.slots[i][j].draw();
            }
            
        }   
    }

    //"ingreso" la ficha pintando uno de los lugares
    //vacíos del tablero. Si no está vacío
    setPosition(column, img) {
        let x = this.slots.length-1;
        let find = false;

        while (!find && x >= 0) {
            if (this.slots[x][column].isFree()) {
                this.slots[x][column].setImg(img);
                this.slots[x][column].setTaken();
                find = true;
            }

            x--;
        }

        if (find)
            return [x+1, column];
        else
            return false;
    }

    checkWin(position) {
        let row = position[0];
        let col = position[1];
        let img = this.slots[row][col].getImg();
        
        return (this.matchCross(row, col, img) || this.matchVertical(row, col, img) || this.matchHorizontal(row, col, img));          
    }

    matchCross(row, col, img) {
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

            if (this.match(row-tmp, col+tmp, img))
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

                if (this.match(row+tmp, col-tmp, img))
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

            if (this.match(row-tmp, col-tmp, img))
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

                if (this.match(row+tmp, col+tmp, img))
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

    matchHorizontal(row, col, img) {
        let count = 0;
        let tmp = 0;
        let keepGoing = true;

        while(keepGoing) {
            if (this.match(row, col+(tmp+=1), img))
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
                if (this.match(row, col-(tmp+=1), img))
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

    matchVertical(row, col, img) {
        let count = 0;
        let tmp = 0;
        let keepGoing = true;

        while(keepGoing) {
            if (this.match(row+(tmp+=1), col, img))
                count++;
            else
                keepGoing = false;
        }

        if (count == 3)
            return true;
        else
            return false;
    }

    match(row, col, img) {
        if (this.inside(row, col)) {
            return (this.slots[row][col].getImg() == img);
        }
    }

    inside(row, col) {
        return (row >= 0 && row <= this.slots.length-1) && (col >= 0 && col <= this.slots[0].length-1);
    }
}