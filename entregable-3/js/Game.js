class Game {
    constructor(loseDiv) {
        this.playing = false;
        this.obstacles = [];
        this.score;
        this.loseDiv = loseDiv;
        this.scoreDiv;
        this.goUp = false;
        this.upTimer = 10;
        this.intervalId;
        this.maxTop;
        this.playerContainer;
        this.body;
        this.bodyHeight;
        this.playerHeight
        this.maxTop;
        this.playerTop;
        this.originalTop;
    }

    initGame() {
        //creo variables útiles
        this.createUsefullVar();

        //creo al jugador y le paso su div contenedor
        this.player = new Player(this.playerContainer);

        //divs pertenecienes a los obstáclos
        let up = document.querySelector('#obstacle1');
        let down = document.querySelector('#obstacle2');
        
        let up2 = document.querySelector('#obstacle3');
        let down2 = document.querySelector('#obstacle4');
        
        let up3 = document.querySelector('#obstacle5');
        let down3 = document.querySelector('#obstacle6');
        
        //las medidas siempre en viewport
        let width = 8;

        //indica donde van a arrancar cuando vuelvan
        let left = 100 + width;
        let startLeft = left;

        //creo los obstáculos
        this.obstacles.push(new Obstacle(up, down, width, left, this.bodyHeight, startLeft));
        this.obstacles.push(new Obstacle(up2, down2, width, left+=40, this.bodyHeight, startLeft));
        this.obstacles.push(new Obstacle(up3, down3, width, left+=40, this.bodyHeight, startLeft));
        
        //evento para impulsar el avión con la barra espaciadora
        window.addEventListener('keyup', e => {
            if (this.playing) {
                if (e.keyCode == 32) {
                    this.goUp = true;
                    this.player.upAnimation();
                }
            }
        });
    }
    
    createUsefullVar() {
        //div de score
        this.scoreDiv = document.querySelector('#score');
        //guardo el contenedor del jugador
        this.playerContainer = document.querySelector('#player-container');
        //guardo el body y su alto
        this.body = document.querySelector('body');
        this.bodyHeight = parseInt(window.getComputedStyle(this.body, null).getPropertyValue('height').split('px')[0]);
        this.playerHeight = parseInt(window.getComputedStyle(this.playerContainer, null).getPropertyValue("height").split('px')[0]);
        //calculo el límite de top para no pasarme del "suelo"
        this.maxTop = this.bodyHeight - this.playerHeight;
        //guardo el top original del jugador
        let top = window.getComputedStyle(this.playerContainer, null).getPropertyValue("top");
        this.originalTop = parseInt(top.split('px')[0]);
        //el top del jugador empieza como original
        this.playerTop = this.originalTop;
    }

    start() {
        //reinicio el score y creo el interval del game loop
        this.playing = true;
        this.score = 0;
        this.player.flyAnimation();
        this.intervalId = setInterval(this.loop.bind(this), 16);
    }
    
    end() {
        //vuelvo el top del jugador al original
        this.playerTop = this.originalTop;
        this.player.setPosition(this.playerTop);
        this.player.update();
        
        //reinicio obstáculos
        this.obstacles.forEach(obs => {
            obs.restart();
        });
    }

    loop() {
        //checkea si el jugador tiene que subir o bajar
        this.checkPlayerMove();
                
        //si "colisiono" con la parte invisible entre los dos
        //obstáculos sumo un punto
        this.checkScore();

        //actualiza los elementos en la pantalla
        this.updateScreen();

        //si colisionó con algún obstáculo pierde
        if (this.collision())
            this.endGame();
    }

    checkPlayerMove() {
        if (this.goUp) {
            if (this.upTimer > 0) {
                this.upTimer--;
                //resto 40 al top del jugador
                this.playerTop -= 7;
    
                //en caso de quedar en negativo lo vuelvo a 0
                //simulando que se choca el techo
                if (this.playerTop < 0)
                    this.playerTop = 0;
    
                //actualizo su posición
                this.player.setPosition(this.playerTop)
                //pongo en false para que no siga saltando
                //infinitamente
            }
            else {
                this.goUp = false;
                this.upTimer = 10;
                this.player.flyAnimation();
            }
        }
        else {
            //sumo 3 al top del jugador
            this.playerTop += 3;

            //si el top actual es mayor o igual al máximo
            //significa que tocó el piso y perdió
            if (this.playerTop <= this.maxTop)
                this.player.setPosition(this.playerTop);
            else {
                this.endGame();
            }
        }
    }

    checkScore() {
        //recorro los obstáculos y veo si el jugador lo superó y sumo al score
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].overcome(this.player.getLeft())) {
                this.score++;            
            }
        }
    }

    collision() {
        //recorro los obstáculos y veo si el jugador colisionó con alguno
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].collision(this.player))
                return true;            
        }

        return false;
    }

    //actualizo posición del jugador, obstáculos y el score
    updateScreen() {
        this.player.update();
        
        this.obstacles.forEach(obs => {
            obs.update();
        });

        this.scoreDiv.children[0].innerHTML = this.score;
    }

    endGame() {
        this.playing = false;
        //borro el interval del game loop
        clearInterval(this.intervalId);
        // //animación de muerte
        this.player.deadAnimation();
        
        let deadInterval = setInterval(() => {
            if (this.playerTop < (this.bodyHeight + this.playerHeight)) {
                this.player.setPosition(this.playerTop += 5);
                this.player.update();
            }
            else {
                clearInterval(deadInterval);
                //hago click al botón play así se reinicia el juego
                this.player.noneAnimation();
                this.loseDiv.classList.remove('hide');
                this.loseDiv.classList.add('show');
                this.loseDiv.style.zIndex = '2';
            }
        }, 16);

    }
}