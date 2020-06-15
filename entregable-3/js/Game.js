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
        this.playerHeight
        this.maxTop;
        this.playerTop;
    }

    initGame() {
        this.createUsefullVar();

        this.player = new Player(this.playerContainer);

        this.score = 0;

        let up = document.querySelector('#obstacle1');
        let down = document.querySelector('#obstacle2');

        let up2 = document.querySelector('#obstacle3');
        let down2 = document.querySelector('#obstacle4');

        let up3 = document.querySelector('#obstacle5');
        let down3 = document.querySelector('#obstacle6');

        this.obstacles.push(new Obstacle(up, down, this.bodyHeight));
        this.obstacles.push(new Obstacle(up2, down2, this.bodyHeight));
        this.obstacles.push(new Obstacle(up3, down3, this.bodyHeight));
        
        window.addEventListener('keyup', e => {
            if (e.keyCode == 32) {
                this.goUp = true;
            }
        });

        this.intervalId = setInterval(this.loop.bind(this), 33);
    }

    createUsefullVar() {
        //guardo el contenedor del jugador
        this.playerContainer = document.querySelector('#player-container');
        //guardo el body y su alto
        this.body = document.querySelector('body');
        this.bodyHeight = parseInt(window.getComputedStyle(this.body, null).getPropertyValue('height').split('px')[0]);
        this.playerHeight = parseInt(window.getComputedStyle(this.playerContainer, null).getPropertyValue("height").split('px')[0]);
        //calculo el límite de top para no pasarme del "suelo"
        this.maxTop = this.bodyHeight - this.playerHeight;
        //guardo el top del jugador que luego ire sumando o restando
        let top = window.getComputedStyle(this.playerContainer, null).getPropertyValue("top");
        this.playerTop = parseInt(top.split('px')[0]);
    }

    loop() {
        this.checkPlayerMove();

        if (this.checkCollision()) {
            this.endGame();
        } else {
            this.score++;
        }

        this.updateScreen();
    }

    checkPlayerMove() {
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
        //recorro los obstáculos y veo si colisonó con alguno
        let response;

        this.obstacles.forEach(obs => {
            response = obs.collision(this.player);
        });

        return response;
    }

    updateScreen() {
        this.player.update();
        
        this.obstacles.forEach(obs => {
            obs.update();
        });

        // this.scoreDiv.innerHTML = this.score;
    }

    endGame() {
        clearInterval(this.intervalId);
        alert('perdiste');
        window.location.reload();
    }
}