window.onload = e => {
    const container = document.querySelector('#container');
    let cont = 20;

    window.addEventListener('click', e => {
        container.style.bottom = cont + 'px';
        cont+=30;
    });
};