"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearNavBar();
    crearReproductor();

    let estrellasContainer = document.querySelector('.valoraciones__estrellas'); 
    let valoraciones = new Valoracion(estrellasContainer);

    let opinion = document.querySelector('#opinionTextArea');
    let warningAlert = document.querySelector('#warningAlert');
    let successAlert = document.querySelector('#successAlert');
    let opinionContainer = document.querySelector('.opiniones__contenido');

    document.querySelector('#btnEnviarOpinion').addEventListener('click', e => {
        e.preventDefault();

        if(valoraciones.getValoracion() > 0 && opinion.value != '') {
            let original = opinionContainer.innerHTML;
            
            opinionContainer.innerHTML = `
                <div class="opiniones__contenido-item">
                    <div class="opiniones__contenido-item-titulo">Usuario logeado dice:</div>
                    <div class="opiniones__contenido-item-mensaje">${opinion.value}</div>
                    <div class="opiniones__contenido-item-valoracion">
                        <i class="fa fa-star"></i>
                        <div>${valoraciones.getValoracion()}</div>
                    </div>
                </div>`;
                
            opinionContainer.innerHTML += original;
            
            opinion.value = '';
            showAlert(successAlert);
        }
        else
            showAlert(warningAlert);
    });

    function showAlert(elem) {
        elem.classList.remove('hide');
        elem.classList.add('show', 'animation');
    }

    warningAlert.addEventListener('animationend', () => {
        warningAlert.classList.remove("show", "animation");
        warningAlert.classList.add('hide');
    });

    successAlert.addEventListener('animationend', () => {
        successAlert.classList.remove("show", "animation");
        successAlert.classList.add('hide');
    });
});