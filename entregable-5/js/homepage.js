"use strict"

document.addEventListener('DOMContentLoaded', e => {
    document.querySelector('#btnBuscar').addEventListener('click', e => {
        location.replace('busqueda.html')
    });

    crearCards();
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
}