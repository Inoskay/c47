var bg,bgImg;
var player, shooterImg, shooter_shooting;

var bullets = 70;
var bullet, bullet_group;

var zombie, zombie_group,zombieImg;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg = loadImage("assets/zombie.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  bg.velocityX = -3

  //creating the player sprite
   player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
   player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

bullet_group = new Group();
zombie_group = new Group();
}

function draw() {
  background(0); 
if(bg.x<200){
  bg.x = bg.width/2

}



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet = createSprite(displayWidth-1150,player.y-30,20,10 );
 bullet.velocityX = 20
 bullet_group.add(bullet)
 
 player.addImage(shooter_shooting);
 
 player.depth = bullet.depth;
 player.depth = player.depth + 1;
 bullets = bullets -1;
 

 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(keyDown("RIGHT")){
  player.x = player.x + 5
}
if(keyDown("LEFT")){
  player.x = player.x - 5
}

if(zombie_group.isTouching(bullet_group)){
  for(var i = 0; i<zombie_group.length; i++){
    if(zombie_group[i].isTouching(bullet_group)){
       zombie_group[i].destroy();
        bullet_group.destroyEach();
       }


  }
}
enemy();

drawSprites();

}

function enemy(){
  if(frameCount % 50 === 0){
    zombie = createSprite(random(500,1100), random(100,500), 40, 40);
    zombie.addImage(zombieImg);
    zombie.scale = 0.1;
    zombie.velocityX = -2;
    zombie_group.add(zombie);
    zombie.lifetime = 400;
    
  }


}