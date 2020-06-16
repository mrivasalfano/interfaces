class Game {
    constructor(playBtn) {
        this.obstacles = [];
        this.score;
        this.playBtn = playBtn;
        this.scoreDiv;
        this.goUp = false;
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

        //creo obstáculos
        let up = document.querySelector('#obstacle1');
        let down = document.querySelector('#obstacle2');
        
        let up2 = document.querySelector('#obstacle3');
        let down2 = document.querySelector('#obstacle4');
        
        let up3 = document.querySelector('#obstacle5');
        let down3 = document.querySelector('#obstacle6');
        
        this.obstacles.push(new Obstacle(up, down, 8, 50, 20, 108, this.bodyHeight));
        this.obstacles.push(new Obstacle(up2, down2, 8, 20, 50, 148, this.bodyHeight));
        this.obstacles.push(new Obstacle(up3, down3, 8, 35, 35, 188, this.bodyHeight));
        
        //evento para impulsar el avión con la barra espaciadora
        window.addEventListener('keyup', e => {
            if (e.keyCode == 32) 
            this.goUp = true;
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
        this.score = 0;
        this.intervalId = setInterval(this.loop.bind(this), 16);
    }
    
    end() {
        //borro el interval del game loop
        clearInterval(this.intervalId);

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

        //actualiza los elementos en la pantalla
        this.updateScreen();

        //si colisionó con algún obstáculo pierde
        if (this.collision())
            this.endGame();
    }

    checkPlayerMove() {
        if (this.goUp) {
            //resto 40 al top del jugador
            this.playerTop -= 60;

            //en caso de quedar en negativo lo vuelvo a 0
            //simulando que se choca el techo
            if (this.playerTop < 0)
                this.playerTop = 0;

            //actualizo su posición
            this.player.setPosition(this.playerTop)
            //pongo en false para que no siga saltando
            //infinitamente
            this.goUp = false;
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

        // this.scoreDiv.innerHTML = this.score;
    }

    endGame() {
        //hago click al botón play así se reinicia el juego
        alert('Perdiste :(');
        this.playBtn.click();
    }
}