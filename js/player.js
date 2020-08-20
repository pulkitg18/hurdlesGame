class Player {
    constructor() {
        this.index = null;  
        this.character = 0; 
        this.distance = 0;  
        this.name = form.nameInput.value(); 
        this.players = [];  
        this.obsGrp = createGroup();    
        this.grndGrp = createGroup();  

        this.images = [
            loadImage("finishline-1.png"),
            loadImage("obstacleimg.png")
        ];
    }
    play() {
        camera.position.x = playerData["player" + this.index].distance; 

        this.distance += this.players[this.index - 1].velocityX; 
        this.updatePlayerInfo();    

        for (let i = 0; i < this.players.length; i++) {
            this.players[i].x = playerData["player" + (i + 1)].distance; 

            this.grndGrp[i].position.y = (height / 4) * i + 110; 
            this.grndGrp[i].shapeColor = "aqua";

            textSize(20);
            textAlign(CENTER);
            fill(255);
            if (i == this.index - 1) {
                text("You", this.players[i].x, this.players[i].y - 40);
            }
            else {
                text("" + playerData["player" + (i + 1)].name, this.players[i].x, this.players[i].y - 40);
            }

            this.players[i].collide(this.obsGrp, () => { this.players[i].velocityX = 0; });
            this.players[i].collide(this.grndGrp);
            this.players[i].velocityY += 0.5;
            this.players[i].limitSpeed(10);

            if (this.players[i].position.x > MAXDIST) {
                game.updateGameState(2);
                game.endGame();
                this.players[this.index - 1].velocityX = 0;
                return 0;
            }
        }

        if (keyDown("d") || keyDown(RIGHT_ARROW))
            this.players[this.index - 1].velocityX += 0.3;
        if (keyDown("a") || keyDown(LEFT_ARROW))
            this.players[this.index - 1].velocityX -= 0.25;
        if (keyDown("w") || keyDown("space") && this.grndGrp[this.index - 1].position.y - this.players[this.index - 1].position.y < 60)
            this.players[this.index - 1].velocityY = -6.5;
        drawSprites();

        image(this.images[0], MAXDIST + 20, 0, 100, height);
    }
    updatePlayerCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }
    updatePlayerInfo() {
        if (this.index === null) {
            this.index = playerCount;
            this.players[this.index - 1].addAnimation("athlete", spriteanim);
        }
        let data = {
            index: this.index,
            name: this.name,
            distance: this.distance,
            character: this.character
        };
        database.ref('players/player' + this.index).set(data);
    }
}