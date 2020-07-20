"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearNavBar();
    crearReproductor();

    let estrellas = document.querySelector('.valoraciones__estrellas').children;

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
        });
    });
});