var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "PLAY"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;



  invisibleBlockGroup = new Group();
  climbersGroup = new Group();

}

function draw() {
  background(200);

    //o que acontece durante a gameplay
    if(gameState === "PLAY"){
      ghost.collide(climbersGroup);

      spawnDoors();
      if(tower.y > 400){
          tower.y = 300
        }
        if(keyDown("a")){
          ghost.velocityX = -2;
        }
        if(keyDown("d")){
          ghost.velocityX = 2;
        }
        if(keyDown("SPACE")){
          ghost.velocityY = -10;
        }
        ghost.velocityY += 0.8;
        drawSprites();

    if(ghost.y > 400){
      gameState = "END";
    }
    if(invisibleBlockGroup.isTouching(ghost)){
      gameState = "END"
    }

    }

    //o que acontece durante o end
    if(gameState === "END"){
      background("black")
      text("Game Over",250,200,)
    }



}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.x = door.x;
    invisibleBlock = createSprite(200,10);
    invisibleBlock.x = climber.x;
    invisibleBlock.velocityY = 1;

    

    invisibleBlockGroup.add(invisibleBlock);
    climbersGroup.add(climber);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
  }


}


//morte: quando cai para fora da tela e quando bate embaixo do climber