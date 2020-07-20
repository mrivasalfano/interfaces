"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearNavBar();
    crearReproductor();

    let estrellas = document.querySelector('.valoraciones__estrellas').children;
    let valoracionActual = 0;
    let opinion = document.querySelector('#opinionTextArea');
    let warningAlert = document.querySelector('#warningAlert');
    let successAlert = document.querySelector('#successAlert');

    document.querySelectorAll('.estrella').forEach(estrella => {
        estrella.addEventListener('mouseover', e => {
            let nroEstrella = estrella.getAttribute('data-valoracion');
            
            for (let i = 0; i < nroEstrella; i++) {
                estrellas[i].classList.add('bordeAmarillo');                
            }
        });

        estrella.addEventListener('mouseleave', e => {
            for (let i = 4; i >= 0; i--) {
                if(estrellas[i].getAttribute('seleccionada') == 'false') {
                    estrellas[i].classList.remove('fa-star', 'bordeAmarillo');                
                    estrellas[i].classList.add('fa-star-o');
                }
                else
                    break;
            }
        });

        estrella.addEventListener('click', e => {
            let nroEstrella = estrella.getAttribute('data-valoracion');

            for (let i=4; i>=nroEstrella; i--) {
                estrellas[i].classList.remove('fa-star', 'bordeAmarillo');                
                estrellas[i].classList.add('fa-star-o');
                estrellas[i].setAttribute('seleccionada', 'false');          
            }

            for (let i = 0; i < nroEstrella; i++) {
                estrellas[i].classList.remove('fa-star-o', 'animacionSeleccion', 'bordeAmarillo'); 
                void estrellas[i].offsetWidth; //para poder volver a aplicar la animación             
                estrellas[i].classList.add('fa-star', 'bordeAmarillo', 'animacionSeleccion');      
                estrellas[i].setAttribute('seleccionada', 'true');          
            }

            valoracionActual = nroEstrella;
        });
    });

    document.querySelector('#btnEnviarOpinion').addEventListener('click', e => {
        e.preventDefault();

        if(valoracionActual > 0 && opinion.value != '') {
            document.querySelector('.opiniones__contenido').innerHTML += `
                <div class="opiniones__contenido-item">
                    <div class="opiniones__contenido-item-titulo">Usuario logeado dice:</div>
                    <div class="opiniones__contenido-item-mensaje">${opinion.value}</div>
                    <div class="opiniones__contenido-item-valoracion">
                        <i class="fa fa-star"></i>
                        <div>${valoracionActual}</div>
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