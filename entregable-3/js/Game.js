class Game {
    constructor(max) {
        this.player;
        this.obstacles = [];
        this.score;
        this.goUp = false;
        this.intervalId;
        this.maxTop = max;
    }

    initGame() {
        this.player = new Player();

        this.score = 0;

        // for (let i = 0; i < 5; i++) {
        //     this.obstacles.push(new Obstacle());
        // }

        window.addEventListener('keyup', e => {
            if (e.keycode == 32) {
                this.goUp = true;
            }
        });

        this.intervalId = setInterval(this.loop.bind(this), 40);
    }

    loop() {
        // if (this.goUp) {
        //     this.player.goUp();
        //     this.goUp = false;
        // }

        this.fall();
        // this.player.update();

        // for (let i = 0; i < this.obstacles.length; i++) {
        //     this.obstacles[i].update();
        // }

        // if (this.checkColition(this.obstacles[n])) {
        //     this.endGame();
        // } else {
        //     this.score++;
        // }

        this.updateScreen();
    }

    fall() {
        let top = window.getComputedStyle(container, null).getPropertyValue("top");
        top = parseInt(top.split('px')[0]);
        top+=2;
        
        if (top <= this.maxTop)
            this.player.setPosition(top);
        else {
            this.endGame();
        }
    }

    checkColition(obstacle) {
        //Ver si el pajaro choco;
    }

    updateScreen() {
        //this.playerDiv.style.top = this.player.position;
        this.player.updateScreen();

        // for (let i = 0; i < this.obstacles.length; i++) {
        //     this.obstacles[i].updateScreen();
        //     //this.obstacles[i].obstacleDiv.style.left = this.obstacles[i].position;
        // }

        // this.scoreDiv.innerHTML = this.score;
    }

    endGame() {
        clearInterval(this.intervalId);
        alert('perdiste');
    }
}