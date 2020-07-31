"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearReproductor().then(e => {
        crearCards().then(e => {
            let contenidoHeader = `
                    <div class="header__contenido">
                        <div class="header__contenido-saludo">
                            <div class="header__contenido-saludo-bienvenido">Bienvenido,</div>
                            <div class="header__contenido-saludo-nombre">Jorge</div>
                        </div>
                        <div class="header__contenido-publicidad">
                            <div class="header__contenido-publicidad-texto">
                                <div class="header__contenido-publicidad-texto1">
                                    Adquirí un plan premium
                                </div>
                                <div class="header__contenido-publicidad-texto2">
                                        y disfrutá de todos los beneficios
                                </div>
                                 
                            </div>
                            <button>Ver planes</button>
                        </div>
                    </div>
                    `;

            crearNavBar(contenidoHeader).then(() => {
                let linkInicio = document.querySelector('#links').children[1];
                linkInicio.classList.remove('underline');
                linkInicio.classList.add('active');

                let flechasIzq = document.querySelectorAll('.contenedor-card__flecha-izquierda');
                let flechasDer = document.querySelectorAll('.contenedor-card__flecha-derecha');
                let pixeles = 220;

                flechasIzq.forEach(flecha => {
                    flecha.addEventListener('click', e => {
                        let contenedorMusica = flecha.parentNode.nextElementSibling.children[1];
                        let items = contenedorMusica.children;
                        
                        if((parseInt(window.getComputedStyle(items[0],null).getPropertyValue('left')) + pixeles) <= 0) {
                            for (let itm of items) {
                                let leftActual = parseInt(window.getComputedStyle(itm,null).getPropertyValue('left'));
                                
                                itm.style.left = (leftActual + pixeles) + 'px';                         
                            };
                        }
                    });
                });

                flechasDer.forEach(flecha => {
                    flecha.addEventListener('click', e => {
                        let contenedorMusica = flecha.parentNode.previousElementSibling.children[1];
                        let items = contenedorMusica.children;

                        for (let itm of items) {
                            let leftActual = parseInt(window.getComputedStyle(itm,null).getPropertyValue('left'));
    
                            itm.style.left = (leftActual - pixeles) + 'px';                         
                        };
                    });
                });

                let reproductor = document.querySelector('.reproductor');
                let contenedorCancion = reproductor.children[4].children[0];
                let tituloCancion = contenedorCancion.children[0];
                let nombreCancion = contenedorCancion.children[1];
                let iconoReproductor = reproductor.children[2].children[1];
                
                //cuando termina la animación que cambia el titulo
                //saco la clase de la animación
                contenedorCancion.addEventListener('animationend', e => {
                    contenedorCancion.classList.remove('cambiarTitulo');
                });

                //cambio el nombre de la canción y aplico una animación
                //también cambio el ícono de play por pausa
                let botonesPlay = document.querySelectorAll('.contenedor-card__card-content-item-play');

                botonesPlay.forEach(itm => {
                    itm.addEventListener('click', e => {
                        botonesPlay.forEach(btn => {
                            btn.classList.remove('fa-pause');
                            btn.classList.add('fa-play');
                            btn.classList.remove('show');
                            btn.classList.add('hide');
                        });

                        let container = itm.previousElementSibling;
                        let artista = container.children[0].innerHTML;
                        let cancion = container.children[1].innerHTML;
                        
                    
                        tituloCancion.innerHTML = artista;
                        nombreCancion.innerHTML = cancion;

                        if(window.innerWidth >= 1000) {
                            itm.classList.remove('fa-play');
                            itm.classList.add('fa-pause');
                            itm.classList.remove('hide');
                            itm.classList.add('show');
                        }

                        iconoReproductor.classList.remove('fa-play-circle');
                        iconoReproductor.classList.add('fa-pause-circle');

                        itm.classList.add('animarSeleccion');
                        
                        contenedorCancion.classList.add('cambiarTitulo');

                        let imagenFrente = itm.parentNode.firstElementChild.querySelector('.cubo-container__cubo-lado-imagen.frontal');
                        
                        let imagenLados = imagenFrente.parentNode.parentNode.querySelectorAll('.cubo-container__cubo-lado-imagen.lado');
                        let cubo = itm.parentNode.firstElementChild.firstElementChild;
                        
                        imagenFrente.classList.add('sinBorde');
                            
                        imagenFrente.addEventListener('transitionend', () => {
                            for(let img of imagenLados) {
                                img.classList.remove('hide');
                                img.classList.add('show');
                            }
                            
                            cubo.classList.add('rotarCubo');
                        });
                    });

                    itm.addEventListener('animationend', () => {
                        itm.classList.remove('animarSeleccion');
                    });
                }); 

                document.querySelectorAll('.item-cancion').forEach(itm => {
                    itm.children[0].addEventListener('click', () => {
                        irCancion(itm);
                    });
                    itm.children[1].addEventListener('click', () => {
                        irCancion(itm);
                    });
                }); 

                document.querySelectorAll('.contededor-card__card-content-item-estrellas').forEach(container => {
                    new Valoracion(container);
                });

                
            });
        })
    });
});

function irCancion(itm) {
    if(window.innerWidth >= 1000)
        location.replace('cancion.html');
    else
        itm.children[2].click();
}

async function crearCards() {
    let mainContainer = document.querySelector('.main-container');
    let cardMusica = await fetch('templates/homepage/card-musica.html');
    cardMusica = await cardMusica.text();

    mainContainer.innerHTML += cardMusica;

    let titles = ['Recomendado para vos', 'Lo más escuchado'];

    let cardArtistas = await fetch('templates/homepage/card-artistas.html');
    cardArtistas = await cardArtistas.text();

    titles.forEach(title => {
        mainContainer.innerHTML += cardArtistas;
        let titulos = document.querySelectorAll('.contenedor-card__card-title');
        titulos[titulos.length-1].innerHTML = title;
    });

    let cardPlaylist = await fetch('templates/homepage/card-playlist.html');
    cardPlaylist = await cardPlaylist.text();

    mainContainer.innerHTML += cardPlaylist;

    let cardPodcast = await fetch('templates/homepage/card-podcast.html');
    cardPodcast = await cardPodcast.text();

    mainContainer.innerHTML += cardPodcast;

    let cardValorar = await fetch('templates/homepage/card-valorar.html');
    cardValorar = await cardValorar.text();

    mainContainer.innerHTML += cardValorar;

    return true;
}