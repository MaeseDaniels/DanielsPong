let startButton = document.getElementById("start");
let initButton = document.getElementById("init");
let raquetOnePoints = document.getElementById("raquetOnePoints");
let raquetTwoPoints = document.getElementById("raquetTwoPoints");
let auds = document.getElementsByClassName("aud");
let audGoal = document.getElementsByClassName("audGoal");

const initialBallValues = {
  width: 10,
  height: 10,
  radius: 5,
  posX: 400,
  posY: 300,
  moveX: '',
  moveY: ''
}

let raquetOneInitial = {
  width: 10,
  height: 50,
  posX: 40,
  posY: 275,
  points: 0,
  move: ''
}

let raquetTwoInitial = {
  width: 10,
  height: 50,
  posX: 750,
  posY: 275,
  points: 0,
  move: ''
}

let raquetOne = {
}

let raquetTwo = {
}

let ball = {
  width: 10,
  height: 10,
  radius: 5,
  posX: 400,
  posY: 300,
  moveX: '',
  moveY: ''
}



let raquetSpeed = 5;
let ballSpeed = 5;
let maxTop = 0;
let maxBottom = 550;
let isBallMoving = false;

let gameInterval = undefined;

let ctx = undefined;
let canvas = document.getElementById("canvas");

if(canvas.getContext){
  ctx= canvas.getContext('2d');
  
}

let initGame = () => {
  clearInterval(gameInterval);
  raquetOne = {...raquetOneInitial};
  raquetTwo = {...raquetTwoInitial};
  raquetOnePoints.innerText = raquetOne.points;
  raquetTwoPoints.innerText = raquetTwo.points;

  gameInterval = setInterval(()=>{
    moveRaquets();
    if(isBallMoving) {
      moveBall();
    }
    
    
    ctx.clearRect(0, 0, 800, 600);
    ctx.fillRect(raquetOne.posX,raquetOne.posY, raquetOne.width, raquetOne.height);
    ctx.fillRect(raquetTwo.posX,raquetTwo.posY, raquetTwo.width, raquetTwo.height);
    ctx.beginPath();
    ctx.arc(ball.posX, ball.posY, ball.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }, 16);
}

window.onkeydown = (e) => {
  // console.log("down",e.key);
  if(e.key == 'w') {
    raquetOne.move = 'up';
  }
  if(e.key == 's') {
    raquetOne.move = 'down';
  }
  if(e.key == 'ArrowUp') {
    raquetTwo.move = 'up';
  }
  if(e.key == 'ArrowDown') {
    raquetTwo.move = 'down';
  }
}

window.onkeyup = (e) => {
  console.log("up",e.key);
  if(e.key == 'w' && raquetOne.move == 'up') {
    raquetOne.move = '';
  }
  if(e.key == 's' && raquetOne.move == 'down') {
    raquetOne.move = '';
  }
  if(e.key == 'ArrowUp' && raquetTwo.move == 'up') {
    raquetTwo.move = '';
  }
  if(e.key == 'ArrowDown' && raquetTwo.move == 'down') {
    raquetTwo.move = '';
  }
  if(e.key==' '){
    isBallMoving = true;
  }
}

function moveBall() {
  let dirX, dirY;
  
  if(ball.moveX.length == 0 && ball.moveY.length == 0){
    dirY = ['up', 'down'];
    dirX = ['left', 'right'];
    ball.moveX = dirX[Math.floor(Math.random()*10)%2];
    ball.moveY = dirY[Math.floor(Math.random()*10)%2];
  }

  if(ball.moveX == 'left') {
    
    ball.posX -= ballSpeed;
    if(ball.posX <= 50 && ball.posX >= 40){
      if(ball.posY >= raquetOne.posY && ball.posY <= raquetOne.posY+24){
        ball.moveX = 'right';
        ball.moveY = 'up';
        auds[Math.floor(Math.random()*7)].play();
      }
      if(ball.posY >= raquetOne.posY+25 && ball.posY <= raquetOne.posY+50){
        ball.moveX = 'right';
        ball.moveY = 'down';
        auds[Math.floor(Math.random()*7)].play();
      }
    }
    
    if(ball.posX <= 5) {
      goalRaquet(raquetTwo);
    }

  }
  if(ball.moveX == 'right') {
    ball.posX += ballSpeed;

    if(ball.posX <= 760 && ball.posX >= 750){
      if(ball.posY >= raquetTwo.posY && ball.posY <= raquetTwo.posY+24){
        ball.moveX = 'left';
        ball.moveY = 'up';
        auds[Math.floor(Math.random()*7)].play();
      }
      if(ball.posY >= raquetTwo.posY+25 && ball.posY <= raquetTwo.posY+50){
        ball.moveX = 'left';
        ball.moveY = 'down';
        auds[Math.floor(Math.random()*7)].play();
      }
    }

    if(ball.posX >= 795) {
      goalRaquet(raquetOne);
    }
  }
  if(ball.moveY == 'up') {
    ball.posY -= ballSpeed;
    if(ball.posY <= 5) {
      ball.moveY = 'down';
    }
  }
  if(ball.moveY == 'down') {
    ball.posY += ballSpeed;
    if(ball.posY >= 595) {
      ball.moveY = 'up';
    }
    
  }

}

function moveRaquets() {
  if(raquetOne.move == 'up'){
    raquetOne.posY -= raquetSpeed;
    if(raquetOne.posY <= maxTop){
      raquetOne.posY = maxTop;
    }
  }
  else if(raquetOne.move == 'down'){
    raquetOne.posY += raquetSpeed;
    if(raquetOne.posY >= maxBottom){
      raquetOne.posY = maxBottom;
    }
  }
  if(raquetTwo.move == 'up'){
    raquetTwo.posY -= raquetSpeed;
    if(raquetTwo.posY <= maxTop){
      raquetTwo.posY = maxTop;
    }
  }
  else if(raquetTwo.move == 'down'){
    raquetTwo.posY += raquetSpeed;
    if(raquetTwo.posY >= maxBottom){
      raquetTwo.posY = maxBottom;
    }
  }
}

function goalRaquet(raquet) {
  ball = {...initialBallValues};
  isBallMoving = false;
  raquet.points += 1;

  raquetOnePoints.innerText = raquetOne.points;
  raquetTwoPoints.innerText = raquetTwo.points;

  audGoal[0].play();
}

startButton.onclick = ()=>{isBallMoving = true;}

initButton.onclick = () => {
  initGame();
}