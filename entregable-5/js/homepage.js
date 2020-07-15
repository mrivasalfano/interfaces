"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearNavBar().then(e => {
        crearReproductor().then(e => {
            crearCards().then(e => {
                let flechasIzq = document.querySelectorAll('.flecha__izquierda');
                let flechasDer = document.querySelectorAll('.flecha__derecha');
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
            });
        })
    });
});

async function crearCards() {
    let titles = ['AÚN SIN ESCUCHAR', 'ESCUCHADO RECIENTEMENTE', 'RECOMENDADO PARA VOS', 'LO MÁS ESCUCHADO'];
    let cardMusica = await fetch('templates/card-musica.html');
    cardMusica = await cardMusica.text();

    titles.forEach(title => {
        document.querySelector('.main-container').innerHTML += cardMusica;
        let titulos = document.querySelectorAll('.title');
        titulos[titulos.length-1].innerHTML = title;
    });

    return true;
}