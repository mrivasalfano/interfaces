"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearNavBar();
    crearReproductor();

    let estrellasContainer = document.querySelector('.valoraciones__estrellas'); 
    let valoraciones = new Valoracion(estrellasContainer);

    let opinion = document.querySelector('#opinionTextArea');
    let warningAlert = document.querySelector('#warningAlert');
    let successAlert = document.querySelector('#successAlert');

    document.querySelector('#btnEnviarOpinion').addEventListener('click', e => {
        e.preventDefault();

        if(valoraciones.getValoracion() > 0 && opinion.value != '') {
            document.querySelector('.opiniones__contenido').innerHTML += `
                <div class="opiniones__contenido-item">
                    <div class="opiniones__contenido-item-titulo">Usuario logeado dice:</div>
                    <div class="opiniones__contenido-item-mensaje">${opinion.value}</div>
                    <div class="opiniones__contenido-item-valoracion">
                        <i class="fa fas"></i>
                        <div>${valoraciones.getValoracion()}</div>
                    </div>
                </div>`;
                
            opinion.value = '';
            showAlert(successAlert);
        }
        else
            showAlert(warningAlert);
    });

    function showAlert(elem) {
        elem.classList.remove('hide');
        elem.classList.add('show', 'showAlert');

        setTimeout(function(){
            elem.classList.remove("show");
            elem.classList.add("hide");
        },3000);
    }
});