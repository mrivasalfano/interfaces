"use strict"

async function crearReproductor() {
    let reproductor = await fetch('templates/reproductor.html');
    reproductor = await reproductor.text();

    document.querySelector('footer').innerHTML = reproductor;

    return true;
}