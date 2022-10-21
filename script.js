const startBtn = document.getElementById('start-button');
const gameSplash = document.getElementById('game-splash');
const gameScreen = document.getElementById('game-screen') //canvas
const winnerScreen = document.getElementById('win-container');
const gameoverScreen = document.getElementById('gameover-screen')
const replayBtn = document.getElementById('replay-button');
const canvas = document.getElementById('Canvas');
canvas.style.border = "3px solid brown";
const ctx = canvas.getContext("2d")
const winbutton = document.querySelector('#win-button')


// background for the game screen
const bgImg = new Image();
bgImg.src = "./images/background.png";
// background for the splash screen
const splashImg = new Image();
splashImg.src = "./images/splash.png";
// background for the game over screen
const gameoverImg = new Image();
gameoverImg.src = "./images/gameover.png";
// background for the winner screen
const winnerImg = new Image();
winnerImg.src = "./images/winner.png";

const heartsImg = new Image();
heartsImg.src = "./images/heart.png";


// to define initial score 
let livesScore = 3;
// array of lives
let livesarray = [
{ x:50, y:20, img: heartsImg}, 
{ x:100, y:20, img: heartsImg},
{ x:150, y:20, img: heartsImg},
]

//Lives-Score//
const livesImg = new Image();
livesImg.src = "./images/heart.png";


// dog image

const dogImage = new Image();
dogImage.src = "./images/dog.png";
let dogX = 450;
let dogmovingLeft = false;
let dogmovingRight = false;
 

const song = new Audio("./audio/gamesong.wav");
song.loop = true;
// food without Gluten 

const food = new Image();
food.src = "./images/food.png";

const water = new Image();
water.src = "./images/water.png";

// food with Gluten (poisen food)

const baguette = new Image();
baguette.src = "./images/baguette.png";

const beer = new Image();
beer.src = "./images/beer.png";

const pizza = new Image();
pizza.src = "./images/pizza.png";


// Dog Movement

let horizontalSpeed = 0
let dogSpeed = 10
let gameOver = false;
let gameId = 0;


class dogMovement {
constructor(objImg, objX, objY){
    this.img = objImg 
    this.x = objX
    this.y = objY
}
draw() {
    ctx.drawImage(this.img, this.x, this.y)
    this.move()
}
    
move() {
    const canMoveLeft = this.x + horizontalSpeed > 0 
    const canMoveRight = this.x + horizontalSpeed < canvas.width - this.y 

if(canMoveLeft && canMoveRight) {
    this.x += horizontalSpeed
}
}
}
// Create dog object
const dog = new dogMovement (dogImage, 150, 600, 65, 160)


// falling foods
let obstacles = [
{ img: baguette, x:300, y:-100, score:-10},
{ img: beer, x:400, y:-300, score:-10},
{ img: food, x:700, y:-500, score:10},
{ img: water, x:800, y:-700, score:10},
{ img: pizza, x:500, y:-900, score:-10},
]

let score=0 

// Food Arrays - with and without gluten
const foodWithoutGluten = [food, water]
const foodWithGluten = [baguette, beer, pizza]
// Max foods showing on the canvas p/interval 
const maxfoodWithoutGLutenElements = 2
const maxfoodWithGlutenElements = 3
//  array to keep all the falling food
let elementsInGame = [];


// movement of the dog

document.addEventListener('keydown', event => {
   if(event.code === "ArrowRight"){
   dogmovingRight = true;
   }   
   if(event.code === "ArrowLeft"){
    dogmovingLeft = true;
    }
}) 


// stop the dog from moving

document.addEventListener('keyup', event => {
    dogmovingRight = false;
    dogmovingLeft = false;
})

let foodWithGlutenElementId
let foodWithoutGlutenElementId
let gameloopId



// Restart (replay-button)

function startPage() {
    
    gameSplash.style.display = "block";
    gameScreen.style.display = "none";
    gameoverScreen.style.display = "none";
    winnerScreen.style.display = "none";
   
}

// Restart (replay-button2 "Let's do it again!")

function resetGame(){
    healthScore = 0
    toxicScore = 0
    dogSpeed = 10

    elementsInGame = [getRandomObject(false)];

    clearInterval(foodWithGlutenElementId) 
    clearInterval(foodWithoutGlutenElementId)
    clearInterval(gameloopId)

    livesarray = [
      { x:50, y:20, img: heartsImg}, 
      { x:100, y:20, img: heartsImg},
      { x:150, y:20, img: heartsImg},
      ]
}



// to show GameOver screen

function gameOverScreen(){
    winnerScreen.style.display = "none";
    gameoverScreen.style.display = "flex";
    gameScreen.style.display = "none";
    canvas.style.display = "none";
    console.log("test")
   
}
// let isGameOver = false;

// to show Winner screen
function winGame(){
  winnerScreen.style.display = "flex";
  gameoverScreen.style.display = "none";
  gameScreen.style.display = "none";
  canvas.style.display = "none";
}
// let Winner = true



// The way that the game works

// function gameState(){
//     if(healthScore === 20){
//         showWinnerScreen()
    
//     // toxicScore (losing points)- when the dog gets poisened by the gluten foods
//     } else if (toxicScore === 8){
//         gameOverScreen()
               
//     } 
//     clearInterval(foodWithGlutenElementId) 
//     clearInterval(foodWithoutGlutenElementId)
// //     clearInterval(gameloopId)
// }
function randomNumber(){
    return Math.random() * canvas.width
}
// Recursive function - what gets the canvas with animation 
function startGame(){  
  gameScreen.style.display = "block";
  canvas.style.display = "block";
  ctx.clearRect(0,0,canvas.width, canvas.height); 
// the image of the object that we want to move
  ctx.drawImage(bgImg, 0, 0);
//to be able to draw the image (image, x starting point, width, height)
  ctx.drawImage(dogImage, dogX, 600, 100, 100);
// the movement of the dog on the canvas 
  for (let i=0; i < obstacles.length; i++){
    ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y, 50, 50);
    obstacles[i].y +=3
    if(obstacles[i].y > canvas.height){
        obstacles[i].y = -300
        obstacles[i].x = randomNumber() 
    }
    checkCollision()
 
}
for(let i=0; i < livesarray.length; i++){
  ctx.drawImage(livesarray[i].img, livesarray[i].x, livesarray[i].y, 25, 25);
}

if (score === 100){ gameOver = true}

// Scoreboard
ctx.font = "30px 'Franklin Gothic Medium";
ctx.fillStyle = "brown";
ctx.fillText(
  `Score is: ${score}`,
  canvas.width / 1.2 - 30, 50
);

  if(gameOver === true ){
    cancelAnimationFrame(gameId)
    song.pause()
    if(score === 100){ winGame()}
    else {gameOverScreen()}
    
  } else {
    gameId = requestAnimationFrame(startGame)
  }  if(dogmovingRight === true){
  //5 is the speed of the dog
    dogX += 5
  } if (dogmovingLeft === true) {
      dogX -= 5
 }

 
}


window.onload = () => {
startPage();
startBtn.onclick = () => {
 // to hide the Splash screen
 gameSplash.style.display = "none";
    song.play()
 // to show the Game screen
 gameScreen.style.display = "block";
  startGame();
} 
  winbutton.onclick = () => {
  canvas.style.display = 'block';
  winnerScreen.style.display = 'none';
  // song.play()
// to show the Game screen
gameScreen.style.display = "block";
gameoverScreen.style.display = "none";
gameOver = false;  
score = 0;
livesScore = 3;
obstacles = [   { img: baguette, x:300, y:-100, score:-10},
  { img: beer, x:400, y:-300, score:-10},
  { img: food, x:700, y:-500, score:10},
  { img: water, x:800, y:-700, score:10},
  { img: pizza, x:500, y:-900, score:-10},
  ]
   dogX = 450;
 livesarray = [
    { x:50, y:20, img: heartsImg}, 
    { x:100, y:20, img: heartsImg},
    { x:150, y:20, img: heartsImg},
    ]
startGame();
}
replayBtn.onclick = () => {
  console.log("restart")
  song.play()


//to hide the Splash screen
canvas.style.display = 'block';
// to show the Game screen
gameScreen.style.display = "block";
gameoverScreen.style.display = "none";
gameOver = false;  
score = 0;
livesScore = 3;
obstacles = [   { img: baguette, x:300, y:-100, score:-10},
  { img: beer, x:400, y:-300, score:-10},
  { img: food, x:700, y:-500, score:10},
  { img: water, x:800, y:-700, score:10},
  { img: pizza, x:500, y:-900, score:-10},
  ]
   dogX = 450;
 livesarray = [
    { x:50, y:20, img: heartsImg}, 
    { x:100, y:20, img: heartsImg},
    { x:150, y:20, img: heartsImg},
    ]
startGame();
    }   
}


// Score board

function drawScore(){
    ctx.drawImage(livesImg, 20, 30, 23)
    ctx.font = '18px arial' 
    ctx.fillStyle = 'brown'
} 

// COLLISION 

function checkCollision (){
  obstacles.forEach((element)=>{
   
 if(element.y +50 - 40 >=dog.y && element.x +50 >=dogX && element.x <= dogX +100 && element.y <=dog.y +100){
  console.log("collision")
  if(element.score >0){
   score += element.score
   element.y = -300 
   element.x = randomNumber()
   console.log(score)
  } else{
    score += element.score
    element.y = -300 
    element.x = randomNumber()
    livesScore --
    livesarray.pop()
    console.log(score, livesScore)
    }
 }
  })
  if(livesScore ===0){gameOver = true}
}

