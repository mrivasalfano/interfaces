"use strict"

document.addEventListener('DOMContentLoaded', e => {
    crearReproductor();
    crearNavBar().then(() => {
        // let navBarHeight = document.querySelector('nav').offsetHeight;
        
        // let btnReproducir = document.querySelector('.playlist__reproducir');

        // window.addEventListener('scroll', () => {
        //     if((window.scrollY + navBarHeight) >= btnReproducir.offsetTop) {
        //         document.body.style.paddingTop = navBarHeight;
        //         btnReproducir.classList.add('fixedTop');
        //     }
        //     else
        //         btnReproducir.classList.remove('fixedTop');
        // });
    });
});