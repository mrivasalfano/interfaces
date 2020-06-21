class Game {
    constructor(loseDiv) {
        this.time = 20;
        this.playing = false;
        this.obstacles = [];
        this.score;
        this.loseDiv = loseDiv;
        this.scoreDiv;
        this.goUp = false;
        this.upTimer = 10;
        this.intervalId;
        this.bonus;
        this.timeInterval;
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
        let distance = 40;

        //creo los obstáculos
        this.obstacles.push(new Obstacle(up, down, width, left, this.bodyHeight, startLeft));
        this.obstacles.push(new Obstacle(up2, down2, width, left+=distance, this.bodyHeight, startLeft));
        this.obstacles.push(new Obstacle(up3, down3, width, left+=distance, this.bodyHeight, startLeft));

        //creo el bonus
        this.createBonus();
        
        //evento para impulsar el avión con la barra espaciadora
        window.addEventListener('keyup', e => {
            if (this.playing ) {
                if (e.keyCode == 32) {
                    this.goUp = true;
                    if (!this.bonusAnimation)
                        this.player.upAnimation();
                }
            }
        });
    }

    createBonus() {
        if(this.bonus != null)
            this.bonus.destroy();    

        this.bonus = null;
        let bonus = document.createElement('div');
        bonus.classList.add('bonus');
        document.querySelector('#bonusContainer').appendChild(bonus);
        this.bonus = new Bonus(bonus);
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
        this.time = 20;
        this.player.flyAnimation();
        this.intervalId = setInterval(this.loop.bind(this), 16);
        this.timeInterval = setInterval(() => {this.time--;}, 1000);
        this.player.setTop(this.playerTop);
    }
    
    end() {
        //vuelvo el top del jugador al original
        this.playerTop = this.originalTop;
        this.player.setTop(this.playerTop);
        this.player.update();
        
        //reinicio obstáculos
        this.obstacles.forEach(obs => {
            obs.restart();
        });

        //creo un nuevo bonus
        this.createBonus();
    }

    loop() {
        //checkea si el jugador tiene que subir o bajar
        this.checkPlayerMove();
                
        //si "colisiono" con la parte invisible entre los dos
        //obstáculos sumo un punto
        this.checkScore();

        //si agarró un diamante sumo el tiempo
        this.checkBonus();

        //actualiza los elementos en la pantalla
        this.updateScreen();

        if(this.time == 0)
            this.endGame();

        //si colisionó con algún obstáculo pierde
        if (this.collision())
            this.endGame();
    }

    checkBonus() {
        //si el jugador tocó el bonus le sumo
        //tiempo y creo un nuevo bonus
        if (this.bonus.collision(this.player)) {
            this.time += 10;        
            this.bonusAnimation = true;
            this.player.bonusAnimation();
            setTimeout(() => {
                this.bonusAnimation = false;
                this.player.flyAnimation();
            }, 1600);
            this.createBonus();
        }
    }

    checkPlayerMove() {
        if (this.goUp) {
            if (this.upTimer > 0) {
                this.upTimer--;
                //resto 40 al top del jugador
                this.playerTop -= 8;
    
                //en caso de quedar en negativo lo vuelvo a 0
                //simulando que se choca el techo
                if (this.playerTop < 0)
                    this.playerTop = 0;
    
                //actualizo su posición
                this.player.setTop(this.playerTop)
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
            this.playerTop += 3.5;

            //si el top actual es mayor o igual al máximo
            //significa que tocó el piso y perdió
            if (this.playerTop <= this.maxTop)
                this.player.setTop(this.playerTop);
            else {
                this.endGame();
            }
        }
    }

    checkScore() {
        //recorro los obstáculos y veo si el jugador lo superó y sumo al score
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].overcome(this.player.getLeft())) 
                this.score++; 
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

    //actualizo posición del jugador, obstáculos, etc
    updateScreen() {
        this.player.update();
        
        this.obstacles.forEach(obs => {
            obs.update();
        });

        //si el bonus se va fuera de la pantalla creo uno nuevo
        this.bonus.update();
        if(this.bonus.out())
            this.createBonus();

        this.scoreDiv.children[0].innerHTML = 'Score: ' + this.score;
        this.scoreDiv.children[1].innerHTML = 'Tiempo: ' + this.time;
    }

    endGame() {
        this.playing = false;
        //borro el interval del game loop
        clearInterval(this.intervalId);
        clearInterval(this.timeInterval);

        //si NO perdió por límite de tiempo
        if(this.time != 0) {
            //animación de muerte
            this.player.deadAnimation();
        
            //intervalo de caída
            let deadInterval = setInterval(() => {
                if (this.playerTop < (this.bodyHeight + this.playerHeight)) {
                    this.player.setTop(this.playerTop += 5);
                    this.player.update();
                }
                else {
                    clearInterval(deadInterval);
                    this.lose('¡Qué choque! :O');
                }
            }, 16);
        }
        else
            this.lose('Te quedaste sin tiempo :(');

        
    }

    lose(msg) {
        this.player.noneAnimation();
        this.loseDiv.children[0].innerHTML = msg;
        this.loseDiv.classList.remove('hide');
        this.loseDiv.classList.add('show');
        this.loseDiv.style.zIndex = '2';
    }
}