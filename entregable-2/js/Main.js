document.addEventListener('DOMContentLoaded', e => {
    let canvas = document.querySelector('#gameBoard');
    let game;
    
    startGame();    
    
    function startGame() {
        game = new Game(canvas);
        game.start();
        game.detectUser();
    }
});