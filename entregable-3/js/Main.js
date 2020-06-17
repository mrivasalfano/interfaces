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
            plane.classList.remove('hide');

            //oculto las reglas y las paso a un zindex atrás
            //así no estorban
            rules.classList.add('hide');
            rules.style.zIndex = '-10';

            //hago lo mismo que con las reglas pero con el 
            //botón de iniciar
            playBtn.classList.add('hide');
            playBtn.style.zIndex = '-10';

            //si no saco el focus, cuando apreto espacio para saltar
            //es puteo si apretara click en el botón y se reinicia el juego
            playBtn.blur();

            game.start();
        }
        else {
            plane.classList.add('hide');

            rules.classList.remove('hide');
            rules.style.zIndex = '1';
    
            playBtn.classList.remove('hide');
            playBtn.style.zIndex = '1';
            
            game.end();
        }
    });
};