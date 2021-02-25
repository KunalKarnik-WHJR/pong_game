var playerPaddle;
var computerPaddle;
var ball;
var edges, speed
var gamestate = "serve";
var compscore = 0;
var playscore = 0;


function preload(){
player= loadImage("boy.png");
playerFall= loadImage("BoyFall.png");
playerKick=loadImage("BoyKick.png");
}

function setup(){
  createCanvas(400,400);
  playerPaddle = createSprite(360, 200, 10, 70);
  playerPaddle.addImage("player",player);
  playerPaddle.addImage("playerFall",playerFall);
  playerPaddle.addImage("playerKick",playerKick);


  computerPaddle = createSprite(10, 200, 10, 70);
  ball = createSprite(200,200,10,10);
  
  edges = createEdgeSprites(); 
}

function draw(){
  background("white");
  fill("white")
  text(compscore, 170,20);
  fill("white")
  text(playscore, 230,20);
  if (gamestate === "serve"){
  fill("white");
  textFont("Monospace");
  text("Press space to serve",150,150);
  } ; 
  

  if(keyDown("space") && gamestate === "serve"){
    serve();
    gamestate = "play";
  }
  
  // playerPaddle.y = mouseY;
  computerPaddle.y = ball.y;


  
  net();
  ball.bounceOff(edges[3]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
  
  if(ball.x > 400 || ball.x < 0){
    reset();
    gamestate = "serve";
    if(ball.x > 0){
      compscore = compscore + 1;
      playerPaddle.changeImage("playerFall")

    }
    if(ball.x > 400){
      playscore = playscore + 1;
    }
  }
  if (playscore === 5 || compscore === 5){
    gamestate = "over";
    text("Game Over!", 170, 160);
    text("Press 'R' to restart", 150, 180);
  }
  if (keyDown("r") && gamestate === "over"){
    gamestate = "serve";
    compscore = 0;
    playscore = 0;
  }
  drawSprites();
}
function net(){
  for(var n=0; n<400; n=n+20){
    stroke("#ffffff");
    line(200,n,200,n+10);
  }}
function serve(){
  var speed = document.getElementById("pace").value;
    ball.velocityX = 5;
    ball.velocityY = 5;
}
function reset(){

  ball.velocityX = 0;
  ball.velocityY = 0;
  
  ball.x = 200;
  ball.y = 200;
}



function keyPressed() {
  if (keyCode === 75) {
    console.log("I pressed")
    playerPaddle.changeImage("playerKick");
    playerPaddle.velocityY += 5;
  } else if (keyCode === 73) {
    playerPaddle.changeImage("playerKick");
    playerPaddle.velocityY -= 5;
    console.log("K pressed")
  }
}

function keyReleased() {
  if (keyCode === 75) {
    console.log("I Released")
    playerPaddle.changeImage("player");
    playerPaddle.velocityY = 0;
  } else if (keyCode === 73) {
    playerPaddle.changeImage("player");
    console.log("K Released")
    playerPaddle.velocityY = 0;
  }
}