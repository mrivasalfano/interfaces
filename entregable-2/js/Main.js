document.addEventListener('DOMContentLoaded', e => {
    let canvas = document.querySelector('#gameBoard');
    let game;

    canvas.width = 1366;
    canvas.height = 600;

    if (window.innerWidth >= 1800) {
        document.body.style.padding = "100px";
        document.body.style.background = "rgb(120, 120, 120)";
    }

    startGame();    
    
    function startGame() {
        game = new Game(canvas);
        game.start();
        game.detectUser();
    }
});