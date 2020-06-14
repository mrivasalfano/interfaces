class Player {
    constructor() {
        this.container = document.querySelector('#container');
        this.height = parseInt(window.getComputedStyle(this.container, null).getPropertyValue('height').split('px')[0]);
        //por ahora tengo el x y ancho aca pero el obstaculo deberia ver si choco contra el jugador
        this.x = parseInt(window.getComputedStyle(this.container, null).getPropertyValue('left').split('px')[0]);
        this.width = parseInt(window.getComputedStyle(this.container, null).getPropertyValue('width').split('px')[0]);
        this.position;
    }

    updateScreen() {
        this.container.style.top = this.position + 'px';
    }

    setPosition(top) {
        this.position = top;
    }

    colition(up, down, left) {
        if((this.x + this.width) >= left) 
            return (this.position <= up) || ((this.position + this.height) >= (body - down)); //falta 
        else 
            return false;
    }
}