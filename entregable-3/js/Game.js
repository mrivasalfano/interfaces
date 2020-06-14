class Game {
    constructor(max) {
        this.obstacles = [];
        this.score;
        this.goUp = false;
        this.intervalId;
        this.maxTop = max;
        this.playerContainer;
        this.body;
        this.bodyHeight;
        this.containerHeight
        this.maxTop;
        this.playerTop;
    }

    initGame() {
        //calculo el maximo de top que le puedo dr al pj
        this.playerContainer = document.querySelector('#container');
        this.body = document.querySelector('body');
        this.bodyHeight = parseInt(window.getComputedStyle(this.body, null).getPropertyValue('height').split('px')[0]);
        this.containerHeight = parseInt(window.getComputedStyle(this.playerContainer, null).getPropertyValue("height").split('px')[0]);
        this.maxTop = this.bodyHeight - this.containerHeight;
        let top = window.getComputedStyle(this.playerContainer, null).getPropertyValue("top");
        this.playerTop = parseInt(top.split('px')[0]);

        this.player = new Player(this.playerContainer);

        this.score = 0;

        let up = document.querySelector('#obstacle1');
        let down = document.querySelector('#obstacle2');

        this.obstacles.push(new Obstacle(up, down, this.bodyHeight));
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

        if (this.checkCollision()) {
            this.endGame();
        } else {
            this.score++;
        }

        this.updateScreen();
    }

    checkMove() {
        if (this.goUp) {
            this.playerTop -= 40;
            
            if (this.playerTop < 0)
                top = 0;

            this.player.setPosition(this.playerTop)
            this.goUp = false;
        }
        else {
            this.playerTop += 3;

            if (this.playerTop <= this.maxTop)
                this.player.setPosition(this.playerTop);
            else {
                this.endGame();
            }
        }

    }

    checkCollision() {
        //Ver si el pajaro choco;
        return this.obstacles[0].collision(this.player);
    }

    updateScreen() {
        //this.playerDiv.style.top = this.player.position;
        this.player.update();
        this.obstacles[0].update();
        // for (let i = 0; i < this.obstacles.length; i++) {
        //     this.obstacles[i].update();
        //     //this.obstacles[i].obstacleDiv.style.left = this.obstacles[i].position;
        // }

        // this.scoreDiv.innerHTML = this.score;
    }

    endGame() {
        clearInterval(this.intervalId);
        alert('perdiste');
    }
}