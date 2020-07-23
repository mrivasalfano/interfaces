"use strict"

async function crearNavBar(contenidoHeader) {
    //pido el html del navbar
    let navBar = await fetch('templates/navbar.html');
    navBar = await navBar.text();

    //se lo meto al header
    let header = document.querySelector('header');
    header.innerHTML = navBar;
    header.innerHTML += contenidoHeader;

    document.querySelector('#btnBuscar').addEventListener('click', e => {
        location.replace('busqueda.html')
    });
    
    //cuando se hace click en la hamburguesa agrego una clase
    //a los links para que aparezcan o desaparezcan
    let iconoHamburguesa = document.querySelector('#hamburguesa');
    let linksNavBar = document.querySelector('#links');
    let divInvisible = document.querySelector('#divInvisible');
    
    iconoHamburguesa.addEventListener('click', () => {
        console.log('abrir');
        linksNavBar.classList.add('abrir');
        divInvisible.classList.add('clickeable');
    });

    divInvisible.addEventListener('click', () => {
        console.log('cerrar');
        linksNavBar.classList.remove('abrir');
        divInvisible.classList.remove('clickeable');
    });

    return true;
}