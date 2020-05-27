class Board {
    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    draw() {
        //dibuja el fondo amarillo
        let background = new Rect(350, 20, 650, 560, this.canvas);
        background.draw('rgba(255, 196, 0, 255)');

        //creo y dibujo los círculos donde irían las fichas
        //guardo las posiciones en una matriz
        let matrix = [];
        
        let startX = (this.canvas.width/2) - (630/2) + 35;
        let startY = 70;


        for (let y=0; y<540; y+=90) {
            let row = [];
        
            for (let x=0; x<630; x+=90) {
                let circle = new Circle(startX + x, startY + y, 85/2, this.canvas);
                circle.draw('rgb(250, 250, 180)');
                
                row.push(circle);
            }    

            matrix.push(row);
        }

        return matrix;
    }
}