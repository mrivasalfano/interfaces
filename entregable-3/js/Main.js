window.onload = e => {
    let playBtn = document.querySelector('#playGame');
    let rules = document.querySelector('#rules');
    let plane = document.querySelector('#plane')
    let playing = false;
    let game = new Game(playBtn);
    game.initGame();

    //botón para iniciar juego
    playBtn.addEventListener('click', e => {
        playing = !playing;

        if (playing) {
            //oculto las reglas y las paso a un zindex atrás
            //así no estorban
            rules.classList.add('hide');
            rules.style.zIndex = '-1';
    
            //hago lo mismo que con las reglas pero con el 
            //botón de iniciar
            plane.classList.remove('hide');
            playBtn.style.zIndex = '-1';

            game.restart();
        }
        else {
            rules.classList.remove('hide');
            rules.style.zIndex = '1';
    
            playBtn.classList.remove('hide');
            playBtn.style.zIndex = '1';
    
        }
    });
};