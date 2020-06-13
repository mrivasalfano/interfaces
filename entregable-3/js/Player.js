class Player {
    constructor(ps) {
        this.container = document.querySelector('#container');
        this.position = window.getComputedStyle(this.container, null).getPropertyValue('top');
    }

    updateScreen() {
        this.container.style.top = this.position + 'px';
    }

    setPosition(top) {
        this.position = top;
    }
}