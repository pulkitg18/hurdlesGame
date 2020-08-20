const MAXDIST = 4500;

var game, form, player
var database = firebase.database(), playerCount;
var animation1, spriteanim, backgroundimg;
var playerData;
function preload() {
    registerEventListeners();

    animation1 = [loadAnimation("athlete-2anim/athlete-1.png","athlete-2anim/athlete-2.png","athlete-2anim/athlete-3.png","athlete-2anim/athlete-4.png","athlete-2anim/athlete-5.png","athlete-2anim/athlete-6.png","athlete-2anim/athlete-7.png","athlete-2anim/athlete-8.png","athlete-2anim/athlete-9.png","athlete-2anim/athlete-10.png","athlete-2anim/athlete-11.png","athlete-2anim/athlete-12.png"),
                  loadAnimation("athlete-1anim2/athlete-3-1.png","athlete-1anim2/athlete-3-2.png","athlete-1anim2/athlete-3-3.png","athlete-1anim2/athlete-3-4.png","athlete-1anim2/athlete-3-5.png","athlete-1anim2/athlete-3-6.png","athlete-1anim2/athlete-3-7.png","athlete-1anim2/athlete-3-8.png","athlete-1anim2/athlete-3-9.png","athlete-1anim2/athlete-3-10.png","athlete-1anim2/athlete-3-11.png","athlete-1anim2/athlete-3-12.png","athlete-1anim2/athlete-3-13.png","athlete-1anim2/athlete-3-14.png")];
    spriteanim = [loadAnimation("athlete-1anim/athlete-1.png","athlete-1anim/athlete-2.png","athlete-1anim/athlete-3.png","athlete-1anim/athlete-4.png","athlete-1anim/athlete-5.png","athlete-1anim/athlete-6.png","athlete-1anim/athlete-7.png","athlete-1anim/athlete-8.png","athlete-1anim/athlete-9.png","athlete-1anim/athlete-10.png","athlete-1anim/athlete-11.png","athlete-1anim/athlete-12.png"),
                  loadAnimation("athlete-3anim/athlete-1.png","athlete-3anim/athlete-2.png","athlete-3anim/athlete-3.png","athlete-3anim/athlete-4.png","athlete-3anim/athlete-5.png","athlete-3anim/athlete-6.png","athlete-3anim/athlete-7.png","athlete-3anim/athlete-8.png","athlete-3anim/athlete-9.png","athlete-3anim/athlete-10.png","athlete-3anim/athlete-11.png","athlete-3anim/athlete-12.png","athlete-3anim/athlete-13.png","athlete-3anim/athlete-14.png")];
    backgroundimg = loadImage("background.jpg");
}
function setup() {
    game = new Game(); 
    form = new Form(); 
    player = new Player();  
}
function draw() {
    camera.position.x = width / 2; 
    game.update();  

    if (form.title == null && game.gamestate == 0) {
        push();
        textSize(25);
        textAlign(CENTER);
        fill(0);
        text("Hello " + player.name + "!", width / 2, 100);
        text("Waiting for other players...", width / 2, 150);
        pop();
    }
    else if(game.gamestate == 2){
        push();
        textSize(25);
        textAlign(CENTER);
        fill(0);
        text("Game Over!", width/2, 100);
        text(`You went ${Math.round(player.distance)} metres`, width/2, 150);
        pop();
    }
}
function showError(err) {
    console.log(err);
}
function registerEventListeners(){
    window.addEventListener("keydown", (e) => { if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) e.preventDefault() });
    
    database.ref('playerCount').on('value', (data) => {
        playerCount = data.val();
        if(data.val() == 4){
            setTimeout(()=>{
            game.updateGameState(1);
            game.startGame();
            },2500);
        };
    }, showError);
    database.ref('players').on('value', (data) => playerData = data.val(), showError);
    
    database.ref('gameState').on('value', (data) => {
        game.gamestate = data.val();
    }, showError);
}