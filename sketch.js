var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg
var heart1Img,heart2Img,heart3Img
var bulletImg
var score = 0
var life=3
var gameState="fight"
var bullets = 50
var explosionSound, losingSound,winningSound
var explosionImg
var bangSound
//loadImages for player, background and shooter player 
function preload() {
bgImg = loadImage("assets/bg.jpeg")
shooterImg = loadImage("assets/shooter_2.png")
shooter_shooting = loadImage("assets/shooter_3.png")
zombieImg=loadAnimation("assets/zombie.png")
heart1Img=loadImage("assets/heart_1.png")
heart2Img=loadImage("assets/heart_2.png")
heart3Img=loadImage("assets/heart_3.png")
bulletImg=loadImage("assets/bullet.png")
explosionSound=loadSound("assets/explosion.mp3")
losingSound=loadSound("assets/lose.mp3")
winningSound=loadSound("assets/win.mp3")
explosionImg=loadAnimation("assets/1.png","assets/2.png","assets/3.png")
bangSound= loadSound("assets/bang.wav")
}




function setup() {

 
  createCanvas(windowWidth,windowHeight);
  edges=createEdgeSprites()

  //adding the background image
bg=createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale=1.1

//creating the player sprite
player=createSprite(displayWidth-1150,displayHeight-300,50,50)
player.addImage(shooterImg)
player.scale=0.3
  player.debug = true

   player.setCollider("rectangle",0,0,300,300)
  

  heart1= createSprite(displayWidth-159,40,20,20)
  heart1.addImage(heart1Img)
  heart1.scale=0.4
  heart1.visible=false
  
  heart2= createSprite(displayWidth-100,40,20,20)
  heart2.addImage(heart2Img)
  heart2.scale=0.4
  heart2.visible=false
 
  heart3= createSprite(displayWidth-150,40,20,20)
  heart3.addImage(heart3Img)
  heart3.scale=0.4
  
  zombieGroup = new Group ()
  bulletGroup=new Group()
}

function draw() {
  background(0);
  player.bounceOff(edges) 

if(gameState==="fight"){
if(life===3){
heart3.visible=true
heart2.visible=false
heart1.visible=false
}
if(life===2){
  heart3.visible=false
  heart2.visible=true
  heart1.visible=false
  }
  if(life===1){
    heart3.visible=false
    heart2.visible=false
    heart1.visible=true 
    }
 if(life===0){
 gameState="lost"
heart1.visible=false
 }

if(score===100){
gameState="won"

}


  //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("down")){
  player.y+=30

  }

  if(keyDown("up")){
    player.y-=30
  
    }


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  shootBullet()
if(zombieGroup.collide(bulletGroup)){
handleCollision(zombieGroup)
}


player.addImage(shooter_shooting)


}

//player goes back to original standing image once we stop pressing the space bar
else if(keyDown("space")){
  //player.addImage( shooter_shooting )
 // player.addImage()
  player.addImage(shooterImg)
// player.addImage(shooter_1.png)

}
if(bullets===0){
  gameState= "bullet"
}
if(zombieGroup.isTouching(bulletGroup)){
  for(i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
     blast = createSprite(zombieGroup[i].x,zombieGroup[i].y,50,50)
     blast.addAnimation("explosion",explosionImg)
     blast.scale=0.8
     blast.life=15
     zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      bangSound.play()
      
      score+=5
      
    }
  }
  }
if(zombieGroup.isTouching(player)){
 for(var i=0;i<zombieGroup.length;i++){
  if(zombieGroup[i].isTouching(player)){
   zombieGroup[i].destroy()
   life=life-1
    }

 }

}
spawnZombies()
}
drawSprites();

fill ("green")
textSize(25)
 text("Score="+score,displayWidth-210,displayHeight/2-220)
text("bullets="+bullets,displayWidth-210,displayHeight/2-250)
 fill ("red")
 text("Heart="+life,displayWidth-200,displayHeight/2-280)
if(gameState==="lost"){
  textSize(100)
  text("GameOver",400,400)
player.destroy()
zombieGroup.destroyEach()
losingSound.play()

}
else if(gameState==="won"){
fill("pink")
textSize(100)
  text("won!",400,400)
  player.destroy()
zombieGroup.destroyEach()
winningSound.play()

}
else if (gameState==="bullet"){
  textSize(100)
  text("BulletsFinished",400,400)
  player.destroy()
zombieGroup.destroyEach()
bulletGroup.destroyEach()
  losingSound.play()
}
}



function spawnZombies(){
if(frameCount % 60===0){
zombie=createSprite(random(400,1110),random(100,550),100,100)
zombie.addAnimation("zombieImage",zombieImg)
zombie.addAnimation("explosion",explosionImg)
zombie.scale = 0.2
    zombie.velocityX = -(3+score/5)
    zombie.lifetime = 200
    zombie.setCollider("rectangle",0,0,400,400)
    zombieGroup.add(zombie)
    
    
}

}
function shootBullet(){
   bullet=createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.addImage(bulletImg)
  bullet.scale=0.05
  bullet.velocityX=20
  player.depth=bullet.depth
  player.depth+=2
  bullet.depth-=1
  bulletGroup.add(bullet)
  bullets-= 1
  explosionSound.play()

}

function handleCollision(zombieGroup){
if(life>0){
score=score+1

}
blast=createSprite(bullet.x+60,bullet.y,50,50)
blast.addImage(explosionImg)
blast.scale=1
bulletGroup.destroyEach()
zombieGroup.destroyEach()
}


