"use strict"

async function crearNavBar() {
    let navBar = await fetch('templates/navbar.html');
    navBar = await navBar.text();

    document.querySelector('header').innerHTML = navBar;

    document.querySelector('#btnBuscar').addEventListener('click', e => {
        location.replace('busqueda.html')
    });
    
    let iconoHamburguesa = document.querySelector('#iconoHamburguesa');
    let linksNavBar = document.querySelector('#links');

    iconoHamburguesa.addEventListener('click', e => {
        let desplegado = iconoHamburguesa.getAttribute('data-desplegado');

        if(desplegado == 'false') {
            linksNavBar.classList.add('abrir');
            iconoHamburguesa.setAttribute('data-desplegado', 'true');
        }
        else {
            linksNavBar.classList.remove('abrir');
            iconoHamburguesa.setAttribute('data-desplegado', 'false');
        }
    });

    return true;
}