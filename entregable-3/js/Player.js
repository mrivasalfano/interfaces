class Player {
    constructor(container) {
        this.container = container;
        this.height = parseInt(window.getComputedStyle(this.container, null).getPropertyValue('height').split('px')[0]);
        this.left = parseInt(window.getComputedStyle(this.container, null).getPropertyValue('left').split('px')[0]);
        this.width = parseInt(window.getComputedStyle(this.container, null).getPropertyValue('width').split('px')[0]);
        this.top;
    }

    update() {
        this.container.style.top = this.top + 'px';
    }

    setTop(top) {
        this.top = top;
    }

    getTop() {
        return this.top;
    }

    getLeft() {
        return this.left;
    }

    getBottom() {
        return this.top + this.height;
    }

    getRight() {
        return this.left + this.width;
    }

    upAnimation() {
        this.noneAnimation();
        this.container.children[0].classList.add("up");
    }

    flyAnimation() {
        this.noneAnimation();
        this.container.children[0].classList.add("fly");
    }

    
    bonusAnimation() {
        this.noneAnimation();
        this.container.children[0].classList.add("bonusAnimation");
    }
    
    deadAnimation() {
        this.noneAnimation();
        this.container.children[0].classList.add("dead");
    }

    noneAnimation() {
        this.container.children[0].classList.remove("fly");
        this.container.children[0].classList.remove("up");
        this.container.children[0].classList.remove("dead");
        this.container.children[0].classList.remove("bonusAnimation");
    }
}