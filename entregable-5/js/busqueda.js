"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearNavBar();
    crearReproductor();
    crearSecciones();
});

async function crearSecciones() {
    let titles = ['Canciones', 'Artistas', 'Álbums', 'PlayLists', 'Podcasts'];
    let seccionBusqueda = await fetch('templates/seccionBusqueda.html');
    seccionBusqueda = await seccionBusqueda.text();

    titles.forEach(title => {
        document.querySelector('.main-container').innerHTML += seccionBusqueda;
        let titulos = document.querySelectorAll('.seccionBusqueda__titulo');
        titulos[titulos.length-1].innerHTML = title;
    });

    return true;
}