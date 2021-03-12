
var ground, groundImage;
var dino,dinoImage;
var bully,bullyImage;
var orange, orangeImage;
var green, greenImage;
var greenGroup, orangeGroup, bullyGroup;
var gameState= 1;
var PLAY=1;
var END=0;
var gameOver, gameOverImage;
var restart, restartImage;
var score=3;     
function preload(){
groundImage = loadImage("track.png");
dinoImage=loadAnimation("dino1.png" ,"dino2.png","dino3.png");
bullyImage = loadImage("bully.png");
orangeImage = loadImage("orangeboost.png");
greenImage = loadImage("greenboost.png");
restartImage = loadImage("restart.png");
gameOverImage = loadImage("gameover.png");
}

 
function setup() {
  createCanvas(800,800);

  ground = createSprite(400, 600, 800, 800);
  ground.scale=2;
  ground.addImage(groundImage);
  

  dino = createSprite(400, 700, 50, 50)
  dino.addAnimation("dino", dinoImage)
  dino.scale=1.5;

  edges=createEdgeSprites();
  gameOver = createSprite(300, 100)
  gameOver.addImage(gameOverImage);
  gameOver.visible = false

  restart = createSprite(300, 240)
  restart.addImage(restartImage);
  restart.scale = 0.5
  restart.visible = false
  orangeGroup = new Group();
  greenGroup = new Group();
  bullyGroup = new Group();

  dino.debug=true;
dino.setCollider("circle",0,0,30);
  
}

function draw() {
  background("brown"); 
 
  if(gameState===PLAY){
    ground.velocityY = 1;
    if(keyDown("d")) {
      dino.x = dino.x + 2;
    }
    if(keyDown("a")) {
      dino.x = dino.x - 2;
    }
    if (ground.y >300){
      ground.y=100;
    }
  spawnBully();
  spawnOrange();
  spawnGreen();
  if(bullyGroup.isTouching(dino)&& score>0){
    score=score-1;
    bullyGroup.destroyEach();
    gameState = PLAY
    
  }
  if(greenGroup.isTouching(dino)){
     bullyGroup.setVelocityYEach(1);
     greenGroup[0].destroy();     
  }
  if(orangeGroup.isTouching(dino)){
    score = score + 1
    orangeGroup[0].destroy();   
  }
  if(score<0){
    gameState=END;
  }
  }else if(gameState===END){

    ground.velocityY = 0;
    bullyGroup.setVelocityYEach(0);
    orangeGroup.setVelocityYEach(0);
    greenGroup.setVelocityYEach(0);
    gameOver.visible = true;
    restart.visible = true;

  }
   

  
  dino.collide(edges);
  drawSprites();
  
  text("EXTRA LIFE: "+score,700,20) ;
}
function spawnBully(){
if(frameCount%270===0){
  bully=createSprite(100,-100,50,50);
  bully.addImage(bullyImage);
  bully.velocityY=2;
  bully.scale = 0.3
  bully.x=Math.round(random(10,790));
  bullyGroup.add(bully);
}
}
function spawnOrange(){
  if(frameCount%1070 === 0){
    orange = createSprite(100, -100, 50, 50);
    orange.addImage(orangeImage);
    orange.velocityY = 1;
    orange.x = Math.round(random(10, 790));
   orange.scale = 0.15
   orangeGroup.add(orange);
  
  }
}
function spawnGreen(){
  if(frameCount%870 === 0){
    green = createSprite(100, -100, 50, 50);
    green.addImage(greenImage)
    green.velocityY = 1;
    green.x = Math.round(random(10, 790));
    green.scale = 0.15
    greenGroup.add(green);
  }
}