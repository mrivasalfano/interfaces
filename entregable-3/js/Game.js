class Game {
    constructor(max) {
        this.player;
        this.obstacles = [document.querySelector('#obstacle1'), document.querySelector('#obstacle2')];
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
            if (e.keyCode == 32) {
                this.goUp = true;
            }
        });

        this.intervalId = setInterval(this.loop.bind(this), 33);
    }

    loop() {
        // if (this.goUp) {
        //     this.player.goUp();
        //     this.goUp = false;
        // }

        this.checkMove();
        // this.player.update();

        // for (let i = 0; i < this.obstacles.length; i++) {
        //     this.obstacles[i].update();
        // }

        if (this.checkColition()) {
            this.endGame();
        } else {
            this.score++;
        }

        this.updateScreen();
    }

    checkMove() {
        let top = window.getComputedStyle(container, null).getPropertyValue("top");
        top = parseInt(top.split('px')[0]);

        if (this.goUp) {
            top-=40;
            
            if (top < 0)
                top = 0;

            this.player.setPosition(top)
            this.goUp = false;
        }
        else {
            top+=3;

            if (top <= this.maxTop)
                this.player.setPosition(top);
            else {
                this.endGame();
            }
        }

    }

    checkColition() {
        //Ver si el pajaro choco;
        let up = parseInt(window.getComputedStyle(this.obstacles[0], null).getPropertyValue('height').split('px')[0]);
        let down = parseInt(window.getComputedStyle(this.obstacles[1], null).getPropertyValue('height').split('px')[0]);
        let left = parseInt(window.getComputedStyle(this.obstacles[1], null).getPropertyValue('left').split('px')[0]);
        
        return this.player.colition(up, down, left);
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