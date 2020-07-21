"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearNavBar();
    crearReproductor();

    let estrellasContainer = document.querySelector('.valoraciones__estrellas'); 
    let estrellas = estrellasContainer.children;
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
            //si las coordenadas del mouse son menores al left de la estrella
            //significa que la "desvaloró"
            if(e.clientX <= e.target.offsetLeft) {
                if(!estaSeleccionada(estrella)) {
                    estrella.classList.remove('fas', 'bordeAmarillo');                
                    estrella.classList.add('far');
                }
            }
        });

        estrellasContainer.addEventListener('mouseleave', e => {
            for (let i = 4; i >= 0; i--) {
                if(!estaSeleccionada(estrellas[i])) {
                    estrellas[i].classList.remove('fas', 'bordeAmarillo');                
                    estrellas[i].classList.add('far');
                }
                else
                    break;
            }
        });

        estrella.addEventListener('click', e => {
            let nroEstrella = estrella.getAttribute('data-valoracion');

            for (let i=4; i>=nroEstrella; i--) {
                estrellas[i].classList.remove('fas', 'bordeAmarillo');                
                estrellas[i].classList.add('far');
                estrellas[i].setAttribute('seleccionada', 'false');          
            }

            for (let i = 0; i < nroEstrella; i++) {
                estrellas[i].classList.remove('far', 'animacionSeleccion', 'bordeAmarillo'); 
                void estrellas[i].offsetWidth; //para poder volver a aplicar la animación             
                estrellas[i].classList.add('fas', 'bordeAmarillo', 'animacionSeleccion');      
                estrellas[i].setAttribute('seleccionada', 'true');          
            }

            valoracionActual = nroEstrella;
        });
    });

    function estaSeleccionada(estrella) {
        return (estrella.getAttribute('seleccionada') == 'true');
    }

    document.querySelector('#btnEnviarOpinion').addEventListener('click', e => {
        e.preventDefault();

        if(valoracionActual > 0 && opinion.value != '') {
            document.querySelector('.opiniones__contenido').innerHTML += `
                <div class="opiniones__contenido-item">
                    <div class="opiniones__contenido-item-titulo">Usuario logeado dice:</div>
                    <div class="opiniones__contenido-item-mensaje">${opinion.value}</div>
                    <div class="opiniones__contenido-item-valoracion">
                        <i class="fa fas"></i>
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