class Game {
    constructor() {
        this.canvas = createCanvas(displayWidth - 16, displayHeight - 20);
        this.gamestate;
    }
    update() {
        this.canvas.background(backgroundimg);

        if (this.gamestate == 1) {
            player.play();
        }
        if (this.gamestate == 0 && form.title) {
            form.restart.elt.disabled = true;
            animation(animation1[player.character], 200, 200);
            animation(spriteanim[player.character], 300, 300);
            if(player.character == 0){
                form.changebtn2.elt.disabled = true;
                form.changebtn1.elt.disabled = false;
            }else{
                form.changebtn1.elt.disabled = true;
                form.changebtn2.elt.disabled = false;
            }
        }
        else
            form.restart.elt.disabled = false;
        if(this.gamestate == 2)
            this.endGame();      
    }
    updateGameState(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    startGame() {
        player.players = [];
        player.obsGrp.removeSprites();
        player.grndGrp.removeSprites();
        for( let i = 0; i < playerCount; i++)
            player.players[i] = createSprite(0, 0, 50, 50);

        for( let i = 0; i < player.players.length; i++){
            player.players[i].position.y = height/4 * i + 20;
            player.players[i].addAnimation("athlete",spriteanim[playerData["player"+(i+1)].character]);
            player.players[i].setCollider("circle");
        }

        for (let i = 0; i < player.players.length; i++) {
            for (let j = 150; j < MAXDIST; j += 250){
                let ons = createSprite(j, (height / 4) * i + 75, 20, 40);
                ons.addImage(player.images[1]);
                ons.setCollider("rectangle",0,0,20,25,0);
                player.obsGrp.add(ons);
            }

            let s = createSprite(0, (height / 4) * i + 110, MAXDIST * 2, 40);
            s.immovable = true;
            player.grndGrp.add(s);
        }
    }
    endGame() {
        database.ref('/').update({
            playerCount: 0,
            players: null
        });
        allSprites.removeSprites();
    }
}