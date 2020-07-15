"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearNavBar().then(e => {
        crearReproductor().then(e => {
            crearCards().then(e => {
                let flechasIzq = document.querySelectorAll('.flecha__izquierda');
                let flechasDer = document.querySelectorAll('.flecha__derecha');
                
                flechasIzq.forEach(flecha => {
                    flecha.addEventListener('click', e => {
                        let contenedorMusica = flecha.parentNode.nextElementSibling.children[1];

                        let leftActual = parseInt(window.getComputedStyle(contenedorMusica,null).getPropertyValue('left'));
                        
                        contenedorMusica.style.left = (leftActual + 200) + 'px';                         
                    });
                });

                flechasDer.forEach(flecha => {
                    flecha.addEventListener('click', e => {
                        let contenedorMusica = flecha.parentNode.previousElementSibling.children[1];

                        let leftActual = parseInt(window.getComputedStyle(contenedorMusica,null).getPropertyValue('left'));
                        
                        contenedorMusica.style.left = (leftActual - 200) + 'px';  
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