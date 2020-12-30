
var player, playerI
var back, backI
var meteor, meteorI, meteorG
var gameState = "play"
var score = 0

function preload(){
 
  playerI = loadImage("7b8b9cbc22da0f51cc6710d470a70abd.png")
  backI = loadImage("space.jpg")
  meteorI = loadImage("meteor.png")
}

function setup() {
  createCanvas(600,600)
  
  back = createSprite(200,200)
  back.addImage(backI)
  back.velocityY = 3
 
  player = createSprite(300,450)
  player.addImage(playerI)
  player.scale = 0.03
  
  meteorG = new Group()
}

function draw() {
  background(0)
  stroke("white")
  text("SCORE: "+score,300,100)
  
  if(gameState === "play"){
  score = score + Math.round(getFrameRate()/60);
    
  if(keyDown("right_arrow")){
     player.x= player.x+2
  }
  
  if(keyDown("left_arrow")){
    player.x = player.x-2
  }
  
  if(player.isTouching(meteorG)){
     player.velocityY = 0
     player.destroy()
     back.velocityY = 0
     gameState = "end"
     }

  if(back.y>400){
     back.y = width/2
     }

  spawnMeteor();
  
 drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
  
  
}

function spawnMeteor(){
  
  if (frameCount % 200 === 0) {
    meteor = createSprite(200,-50)
    meteor.addImage(meteorI)
    meteor.velocityY = 4 
    meteor.scale = 0.1
    meteor.x = Math.round(random(120,400))
    meteor.lifetime = 400
    meteorG.add(meteor)
    
    player.depth = meteor.depth
    player.depth++
}
}
