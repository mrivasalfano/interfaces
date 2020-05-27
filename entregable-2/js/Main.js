let canvas = document.querySelector('#gameBoard');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

startGame(); 

function startGame() {
    let game = new Game('Juan', 'Manuel', canvas);
    game.start();
}



