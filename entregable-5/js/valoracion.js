class Valoracion {
    constructor(container) {
        this.estrellasContainer = container;
        this.estrellas = this.estrellasContainer.children;
        this.controlValoraciones();
        this.valoracionActual = 0;
    }

    controlValoraciones() {
        this.estrellasContainer.addEventListener('mouseleave', e => {
            for (let i = 4; i >= 0; i--) {
                if(!this.estaSeleccionada(this.estrellas[i])) {
                    this.estrellas[i].classList.remove('fas', 'bordeAmarillo');                
                    this.estrellas[i].classList.add('far');
                }
                else
                    break;
            }
        });
        
        for(let estrella of this.estrellas) {
            estrella.addEventListener('mouseover', e => {
                let nroEstrella = estrella.getAttribute('data-valoracion');
                
                for (let i = 0; i < nroEstrella; i++) {
                    this.estrellas[i].classList.add('bordeAmarillo');                
                }
            });
    
            estrella.addEventListener('mouseleave', e => {
                //si las coordenadas del mouse son menores al left de la estrella
                //significa que la "desvaloró"
                                
                if((e.clientX-1) <= e.target.getBoundingClientRect().x) {
                    if(!this.estaSeleccionada(estrella)) {
                        estrella.classList.remove('fas', 'bordeAmarillo');                
                        estrella.classList.add('far');
                    }
                }
            });
    
            estrella.addEventListener('click', e => {
                let nroEstrella = estrella.getAttribute('data-valoracion');
                this.valoracionActual = nroEstrella;

                for (let i=4; i>=nroEstrella; i--) {
                    this.estrellas[i].classList.remove('fas', 'bordeAmarillo');                
                    this.estrellas[i].classList.add('far');
                    this.estrellas[i].setAttribute('seleccionada', 'false');          
                }
    
                for (let i = 0; i < nroEstrella; i++) {
                    this.estrellas[i].classList.remove('far', 'animacionSeleccion', 'bordeAmarillo'); 
                    void this.estrellas[i].offsetWidth; //para poder volver a aplicar la animación             
                    this.estrellas[i].classList.add('fas', 'bordeAmarillo', 'animacionSeleccion');      
                    this.estrellas[i].setAttribute('seleccionada', 'true');          
                }
            });
        };
    }

    estaSeleccionada(estrella) {
        return (estrella.getAttribute('seleccionada') == 'true');
    }

    getValoracion() {
        return this.valoracionActual;
    }
}