"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearNavBar().then(e => {
        crearReproductor().then(e => {
            crearCards().then(e => {
                let flechasIzq = document.querySelectorAll('.contenedor-card__flecha-izquierda');
                let flechasDer = document.querySelectorAll('.contenedor-card__flecha-derecha');
                let pixeles = 200;

                flechasIzq.forEach(flecha => {
                    flecha.addEventListener('click', e => {
                        let contenedorMusica = flecha.parentNode.nextElementSibling.children[1];

                        let leftActual = parseInt(window.getComputedStyle(contenedorMusica,null).getPropertyValue('left'));

                        if (leftActual < 0)
                            contenedorMusica.style.left = (leftActual + pixeles) + 'px';                         
                    });
                });

                flechasDer.forEach(flecha => {
                    flecha.addEventListener('click', e => {
                        let contenedorMusica = flecha.parentNode.previousElementSibling.children[1];

                        let leftActual = parseInt(window.getComputedStyle(contenedorMusica,null).getPropertyValue('left'));

                        //funciona pero es un parche nada más, los 800
                        //no deberían ser fijos
                        if (leftActual > (-800))
                            contenedorMusica.style.left = (leftActual - pixeles) + 'px';  
                    });
                });

                let reproductor = document.querySelector('.reproductor');
                let contenedorCancion = reproductor.children[4];
                let tituloCancion = contenedorCancion.children[0];
                let nombreCancion = contenedorCancion.children[1];
                let iconoReproductor = reproductor.children[2].children[1];
                console.log(iconoReproductor);
                
                //cuando termina la animación que cambia el titulo
                //saco la clase de la animación
                contenedorCancion.addEventListener('animationend', e => {
                    contenedorCancion.classList.remove('cambiarTitulo');
                });

                //cambio el nombre de la canción y aplico una animación
                //también cambio el ícono de play por pausa
                document.querySelectorAll('.contenedor-card__card-content-item').forEach(itm => {
                    itm.addEventListener('click', e => {
                        let artista = itm.children[1].innerHTML;
                        let cancion = itm.children[2].innerHTML;

                        tituloCancion.innerHTML = artista;
                        nombreCancion.innerHTML = cancion;

                        iconoReproductor.classList.remove('fa-play-circle');
                        iconoReproductor.classList.add('fa-pause-circle');

                        contenedorCancion.classList.add('cambiarTitulo');
                    });
                }); 
            });
        })
    });
});

async function crearCards() {
    let titles = ['AÚN SIN VALORAR', 'ESCUCHADO RECIENTEMENTE', 'RECOMENDADO PARA VOS', 'LO MÁS ESCUCHADO'];
    let cardMusica = await fetch('templates/card-musica.html');
    cardMusica = await cardMusica.text();

    titles.forEach(title => {
        document.querySelector('.main-container').innerHTML += cardMusica;
        let titulos = document.querySelectorAll('.contenedor-card__card-title');
        titulos[titulos.length-1].innerHTML = title;
    });

    return true;
}