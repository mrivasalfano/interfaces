"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearReproductor();
    crearSecciones();

    let contenidoHeader = `
                    <div class="header__contenido">
                        <div class="header__contenido-texto">Filtrá tu búsqueda</div>
                        <button>Filtrar</button>
                    </div>
                    `;

    crearNavBar(contenidoHeader);
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

    document.querySelectorAll('.seccionBusqueda__contenido-item-nombre').forEach(itm => {
        itm.addEventListener('click', () => {
            location.replace('cancion.html');
        });
    });

    document.querySelectorAll('.seccionBusqueda__contenido-item-imagen').forEach(itm => {
        itm.addEventListener('click', () => {
            location.replace('cancion.html');
        });
    });
    
    return true;
}