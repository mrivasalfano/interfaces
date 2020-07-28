"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearReproductor();
    crearSecciones();

    let contenidoHeader = `
                    <div class="header__contenido">
                        <div class="header__contenido-texto">Filtrá tu búsqueda</div>
                        <button>Filtrar <i class="fas fa-angle-down"></i></button>
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
            location.replace(itm.getAttribute('href'));
        });
    });

    document.querySelectorAll('.seccionBusqueda__contenido-item-imagen').forEach(itm => {
        itm.addEventListener('click', () => {
            location.replace(itm.getAttribute('href'));
        });
    });

    let reproductor = document.querySelector('.reproductor');
    let contenedorCancion = reproductor.children[4].children[0];
    let tituloCancion = contenedorCancion.children[0];
    let nombreCancion = contenedorCancion.children[1];
    let iconoReproductor = reproductor.children[2].children[1];

    document.querySelectorAll('.seccionBusqueda__contenido-item-play').forEach(itm => {
        itm.addEventListener('click', e => {
            let container = itm.previousElementSibling;
            let artista = container.children[0].innerHTML;
            let cancion = container.children[1].innerHTML;
            
        
            tituloCancion.innerHTML = artista;
            nombreCancion.innerHTML = cancion;

            itm.classList.remove('fa-play');
            itm.classList.add('fa-pause');

            iconoReproductor.classList.remove('fa-play-circle');
            iconoReproductor.classList.add('fa-pause-circle');

            itm.classList.add('animarSeleccion');
            
            contenedorCancion.classList.add('cambiarTitulo');
        });

        itm.addEventListener('animationend', () => {
            itm.classList.remove('animarSeleccion');
        });
    }); 
    
    return true;
}