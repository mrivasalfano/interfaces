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
    let divInvisible = document.querySelector('#divInvisible')
    let body = document.querySelector('body');

    iconoHamburguesa.addEventListener('click', () => {
        linksNavBar.classList.add('abrir');
        divInvisible.classList.add('clickeable');
    });

    divInvisible.addEventListener('click', () => {
        linksNavBar.classList.remove('abrir');
        divInvisible.classList.remove('clickeable');
    });

    return true;
}

