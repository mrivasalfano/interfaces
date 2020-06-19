class Player {
    constructor(container) {
        this.container = container;
        this.height = parseInt(window.getComputedStyle(this.container, null).getPropertyValue('height').split('px')[0]);
        this.left = parseInt(window.getComputedStyle(this.container, null).getPropertyValue('left').split('px')[0]);
        this.width = parseInt(window.getComputedStyle(this.container, null).getPropertyValue('width').split('px')[0]);
        this.position;
    }

    update() {
        this.container.style.top = this.position + 'px';
    }

    setPosition(top) {
        this.position = top;
    }

    getPosition() {
        return this.position;
    }

    getLeft() {
        return this.left;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    upAnimation() {
        this.container.children[0].classList.remove("fly");
        this.container.children[0].classList.add("up");
    }

    flyAnimation() {
        this.container.children[0].classList.remove("up");
        this.container.children[0].classList.add("fly");
    }

    deadAnimation() {
        this.container.children[0].classList.remove("up");
        this.container.children[0].classList.remove("fly");
        this.container.children[0].classList.add("dead");
    }

    noneAnimation() {
        this.container.children[0].classList.remove("fly");
        this.container.children[0].classList.remove("up");
        this.container.children[0].classList.remove("dead");
    }
}