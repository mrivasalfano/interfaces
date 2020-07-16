"use strict"

async function crearNavBar() {
    //pido el html del navbar
    let navBar = await fetch('templates/navbar.html');
    navBar = await navBar.text();

    //se lo meto al header
    document.querySelector('header').innerHTML = navBar;

    document.querySelector('#btnBuscar').addEventListener('click', e => {
        location.replace('busqueda.html')
    });
    
    //cuando se hace click en la hamburguesa agrego una clase
    //a los links para que aparezcan o desaparezcan
    let iconoHamburguesa = document.querySelector('#hamburguesa');
    let linksNavBar = document.querySelector('#links');
    let body = document.querySelector('body');

    iconoHamburguesa.addEventListener('click', e => {
        let desplegado = iconoHamburguesa.getAttribute('data-desplegado');

        if(desplegado == 'false') {
            linksNavBar.classList.add('abrir');
            iconoHamburguesa.setAttribute('data-desplegado', 'true');
            body.style.overflow = 'hidden';
        }
        else {
            linksNavBar.classList.remove('abrir');
            iconoHamburguesa.setAttribute('data-desplegado', 'false');
            body.style.overflow = 'visible';
        }
    });

    return true;
}