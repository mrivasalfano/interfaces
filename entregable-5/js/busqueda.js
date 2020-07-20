"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearNavBar();
    crearReproductor();
    crearSecciones();
});

async function crearSecciones() {
    let mainContainer = document.querySelector('.main-container');

    let canciones = await fetch('templates/busqueda/canciones.html');
    canciones = await canciones.text();

    mainContainer.innerHTML += canciones;

    let artistas = await fetch('templates/busqueda/artistas.html');
    artistas = await artistas.text();

    mainContainer.innerHTML += artistas;

    let playlists = await fetch('templates/busqueda/playlists.html');
    playlists = await playlists.text();

    mainContainer.innerHTML += playlists;

    return true;
}