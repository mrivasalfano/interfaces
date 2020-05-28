class Board {
    constructor(width, height, slots, canvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    draw() {
        //dibuja el fondo amarillo
        let background = new Rect(370, 85, 600, 510, this.canvas);
        background.draw('rgba(255, 196, 0, 255)');

        //creo y dibujo los círculos donde irían las fichas
        //guardo las posiciones en una matriz
        let matrix = [];
        
        let startX = 430;
        let startY = 140;


        for (let y=0; y<480; y+=80) {
            let row = [];
        
            for (let x=0; x<560; x+=80) {
                let circle = new Circle(startX + x, startY + y, 35, this.canvas);
                circle.draw('rgb(250, 250, 180)');
                
                row.push(circle);
            }    

            matrix.push(row);
        }

        return matrix;
    }
}