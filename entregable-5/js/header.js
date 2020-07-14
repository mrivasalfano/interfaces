"use strict"

document.addEventListener('DOMContentLoaded', e => {
    let iconoHamburguesa = document.querySelector('#iconoHamburguesa');
    let linksNavBar = document.querySelector('#linksNavBar');

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
});