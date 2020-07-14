"use strict"

document.addEventListener('DOMContentLoaded', e => {
    document.querySelector('#btnBuscar').addEventListener('click', e=> {
        location.replace('busqueda.html')
    });

    crearCards();
});

async function crearCards() {
    let cardMusica = await fetch('../templates/card-musica.html');

    document.querySelector('.main-container').innerHTML = cardMusica;
}