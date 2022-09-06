var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombies = []
var bullets = []
var zombiesGroup ,bulletsGroup
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  bulletImg = loadImage("assets/Bullet.webp")
  bulletSound = loadSound("assets/explosion.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

  bulletsGroup = new Group()
  zombiesGroup = new Group()
}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bulletSound.play()
  player.addImage(shooter_shooting)
  shoot();
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnZombies();
for(var i = 0;i<bullets.length;i++){
  for(var j = 0; j<zombies.length;j++){
    if(bullets[i]!= null && zombies[j]!= null){
    
    if(bullets[i].isTouching(zombies[j])){
      zombiesGroup[j].destroy()
      zombies.splice(j,1)
      bulletsGroup[i].destroy()
      bullets.splice(i,1)
    }}
  }

}
drawSprites();

}

function spawnZombies(){
  if(frameCount%30==0){
    zombie = createSprite(width,random(100,1000),40,40)
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -5
    zombies.push(zombie)
    zombiesGroup.add(zombie)
  }  
}

function shoot(){
  bullet = createSprite(player.position.x,player.position.y,20,20)
  bullet.velocityX = 5
  bullet.addImage(bulletImg);
  bullet.scale = 0.05
  bullets.push(bullet)
  bulletsGroup.add(bullet)

}
