let canvas = document.querySelector('#gameBoard');
let game;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

startGame(); 

function startGame() {
    game = new Game('Juan', 'Manuel', canvas);
    game.start();
    game.detectUser();
}



