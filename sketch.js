var monkey, monkeyRunning;
var ground, groundImage, invisibleGround;
var bananaImage,stoneImage;
var bananaGroup,stoneGroup;
var score;

function preload() {
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  groundImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600, 600);
   ground = createSprite(200, 160, 400, 10)
  ground.addImage("ground", groundImage)
  ground.velocityX = -5;
    ground.x = ground.width / 2;
  ground.scale = 1.5;

  
  monkey = createSprite(200, 500, 10, 10)
  monkey.addAnimation("running", monkeyRunning)
  monkey.scale = 0.1;
  monkey.x = 50;



  invisibleGround = createSprite(200, 580, 400, 10)
  invisibleGround.visible = false;

  score = 0;
  
  bananaGroup = new Group ();
  stoneGroup = new Group ();
}

function draw() {
  background("jungle.png");
  
  if (keyDown("space")) {
    monkey.velocityY = -5
  }

  monkey.velocityY = monkey.velocityY + 0.5
  monkey.collide(invisibleGround) 

  if (ground.x < 0) {
    ground.x = ground.width / 2
  }
  
  text("SCORE:" + score, 400,50);

  spawnBananas();
  spawnStones();
  
  if(bananaGroup.isTouching(monkey)){
    score = score+2;
    bananaGroup.destroyEach();
  }
  
  if(stoneGroup.isTouching(monkey)){
    monkey.scale = 0.1;    
  }
  
  switch(score){
    case 10: monkey.scale= 0.15;
      break;
      
    case 20: monkey.scale= 0.2;
      break;
      
    case 30: monkey.scale= 0.25;
      break;
      
    case 40: monkey.scale= 0.3;
      break;
      
    case 50: monkey.scale= 0.35;
      break;
      default: break;
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE:" + score,400,50);
  
}

function spawnBananas() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(200, 510, 10, 10);
    banana.addImage("bananas", bananaImage);
    banana.velocityX = -5;
    banana.x=600;
    banana.y=random(450,500);
    banana.scale = 0.1;
    banana.lifetime = 130;
    bananaGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function spawnStones(){
  if (frameCount % 120 === 0){
    var stone = createSprite(600,560,10,10);
    stone.addImage("stone", stoneImage);
    stone.velocityX = -5;
    stone.scale = 0.1;
    stoneGroup.add(stone);
    stone.lifetime = 134;
     stone.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    }
}

