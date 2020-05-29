document.addEventListener('DOMContentLoaded', e => {
    let canvas = document.querySelector('#gameBoard');
    let game;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    startGame();    
    
    function startGame() {
        game = new Game(canvas);
        game.start();
        game.detectUser();
    }
});