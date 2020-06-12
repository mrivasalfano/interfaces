window.onload = e => {
    const playBtn = document.querySelector('#playGame');
    
    //botón para iniciar juego
    playBtn.addEventListener('click', e => {
        //oculto las reglas y las paso a un zindex atrás
        //así no estorban
        let rules = document.querySelector('#rules');
        rules.style.display = 'none';
        rules.style.zIndex = '-1';

        //hago lo mismo que con las reglas pero con el 
        //botón de iniciar
        document.querySelector('#plane').classList.remove('hide');
        playBtn.style.display = 'none';
        playBtn.style.zIndex = '-1';

        let container = document.querySelector('#container');
        
        setInterval(e => {
            let top = window.getComputedStyle(container, null).getPropertyValue("top");
            container.style.top = (top+5) + 'px';
        }, 40);

        game = new Game();
    });
};