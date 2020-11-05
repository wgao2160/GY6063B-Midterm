let farm;
let farm2;
let apple;
let basket;
let worm;
let appleX;
let appleY;
let wormX;
let wormY;
let score;
let life;

let applesound;
let wormsound;
let gameoversound;
let gamewinsound;
let backgroundsound;
let startscreen;

let width = 800;
let height = 600;
let x = width / 2 - 70;
let y = height - 90;
let level = 0;
let time;
let appleStart;

let colors = ['red', 'green', 'orange', 'yellow'];


function preload() {
  // image
  farm = loadImage("./pictures/farm.png");
  farm2 = loadImage("./pictures/farm2.png");
  apple = loadImage("./pictures/apple.png");
  basket = loadImage('./pictures/basket.png');
  startscreen = loadImage('./pictures/startscreen.png');
  worm = loadImage('./pictures/worm.png');
  // sound
  backgroundsound = loadSound('./sound/background.mp3')
  applesound = loadSound('./sound/applesound.mp3')
  wormsound = loadSound('./sound/wormdrop.mp3');
  gameoversound = loadSound('./sound/gameover.mp3');
  gamewinsound = loadSound('./sound/winsound.mp3');
}


function setup() {
  createCanvas(width, height);
  backgroundsound.play();
  backgroundsound.setVolume(0.2);
  backgroundsound.loop()
  appleX = random(50, 600);
  wormX = random(50, 600);
  appleY = 0;
  wormY = 0;
  score = 0;
  life = 3;
  time = 0;
  appleStart = new bigAppleStart();
}


// key function
function mousePressed() {
  if (mouseX > 480 && mouseX < 745 && mouseY > 370 && mouseY < 550) {
    if (level == 0) {
      level = 1;
    }
  }
}

function draw() {
  if (keyIsDown(LEFT_ARROW) || x > 650) {
    x -= 30;
  }
  if (keyIsDown(RIGHT_ARROW) || x < 20) {
    x += 30;
  }
  Appleplay();
  level0play()
}


function level0play() {
  // level 0 
  if (level == 0) {
    level0();
    background(255)
    image(startscreen, 0, -150, 800, 600);

    // apple decoration
    applex = 65;
    appley = 65;

    for (let i = 0; i < 5; i++) {
      noStroke();
      fill(224, 90, 90);
      ellipse(applex * i + 95, 222, 50, 56);
      ellipse(appley * i + 85, 222, 50, 56);
      fill('black')
      strokeWeight(3)
      rect(applex * i + 84, 205, 13, 1);
      fill('grey')
      rect(92, 195, 1, 10);
      rect(156, 195, 1, 10);
      rect(221, 195, 1, 10);
      rect(284, 195, 1, 10);
      rect(347, 195, 1, 10);
    }
    // Welcome text
    strokeWeight(1);
    stroke(0);
    textFont("Georgia");
    welcomecolor = colors[Math.floor(Math.random() * colors.length)];
    frameRate(2);
    fill(welcomecolor);
    textSize(55);
    text("Welcome to Apple Farm!", 100, 150);

    // big apple animation
    noStroke();
    appleStart.move();
    appleStart.display();

    push()
    // instruction text
    fill('black');
    textFont("Georgia");
    textSize(40);
    text(" Get 150 to win!", 120, 390);
    fill('black');
    textSize(20);
    text("* catch apple +10; ", 150, 440);
    text("* miss apple -10; ", 150, 480);
    text("* catch worm -life;", 150, 520);
    pop()
  }
}

function Appleplay() {
  image(farm, 0, 0, 800, 600);
  image(apple, appleX, appleY, 50, 50);
  image(basket, x, y, 130, 95);
  textSize(20);
  fill('#2b2d42')
  textFont("Georgia");
  text("Score:", 640, 50);
  text(score, 705, 50);
  text("Life:", 640, 25);


  // level 1
  if (score < 60 && level == 1) {
    level1();
    if (time <= 40) {
      textFont("Georgia");
      textSize(130);
      fill('white');
      text("Level 1", 220, 300);
      time++;
    }
  }


  // level 2 
  if (score >= 60 || level == 2) {
    level = 2;
    level1();
    level2();
    image(farm2, 0, 0, width, height);
    image(apple, appleX, appleY, 50, 50);
    image(basket, x, y, 130, 95);
    image(worm, wormX, wormY, 80, 80);
    textSize(20);
    fill('white')
    textFont("Georgia");
    text("Score:", 640, 50);
    text(score, 705, 50);
    text("Life:", 640, 25);

    if (time <= 80) {
      textFont("Georgia");
      textSize(130);
      fill('#F2F2F2');
      text("Level 2", 210, 280);
      time++;
    }

  }
  textSize(20);
  push()
  fill('red')
  text(life, 695, 25);
  pop()

  // game over 
  if (life == 0 || score < 0) {
    noLoop()
    gameoversound.play();
    gameoversound.setVolume(0.2);
    //text
    textFont("Georgia");
    textSize(100);

    background(230, 57, 70, 150);

    fill(255);
    text("Game Over", 165, 270);
    textSize(40);
    text("Your Score:", 285, 330);
    text(score, 505, 330);
  }

  // game win
  if (life > 0 && score >= 150) {
    noLoop()
    gamewinsound.play();
    gamewinsound.setVolume(0.2);
    //text
    textFont("Georgia");
    textSize(100);
    background(94, 100, 114, 150);
    fill(255);
    text("You Win!", 175, 270);
    textSize(40);
    text("Your Score:", 250, 330);
    text(score, 470, 330);
  }
}

// level 0
function level0() {

}

// level 1
function level1() { //collect apples miss deduct points and hit 0 deduct marks
  frameRate(25);
  appleY = appleY + 22;

  if (appleY > 600) {
    appleX = random(50, 750);
    appleY = -500;
  }

  // catch apple +10
  if (appleY > 520 && appleX >= x - 95 && appleX <= x + 95) {
    score = score + 10;
    appleY = 0;
    appleX = random(50, 600);
    applesound.play();
    applesound.setVolume(0.2);
  }

  // miss apple -10
  if (appleY > 500 && appleX < x - 93 || appleY > 500 && appleX > x + 93) {
    score = score - 10;
    appleY = -500;
    appleX = random(50, 600);
    if (score <= 0) {
      score = 0;
      life--;
    }
  }
}

//level 2 - worm
function level2() {
  image(worm, wormX, wormY, 80, 80);
  appleY = appleY + 10;
  wormY = wormY + 24;

  if (wormY > 600) {
    wormX = random(50, 700);
    wormY = -50;
  }
  if (wormY > 520 && wormX > x - 100 && wormX < x + 95) {
    life--;
    wormY = -500;
    wormsound.play()
    wormsound.setVolume(0.2);
  }

}

// big apple animation
let gravity = 0.9;

class bigAppleStart {
  constructor() {
    this.x = 630;
    this.y = 450;
    this.diameter = 180;
    this.speed = 15;
  }

  move() {
    this.y = this.y + this.speed;
  }

  display() {
    fill(224, 90, 90);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    ellipse(this.x - 50, this.y, this.diameter, this.diameter);
    fill(48, 130, 31);
    rect(this.x - 30, this.y - 120, 15, 55);
    if (this.y > height - 150) {
      this.speed = this.speed * -0.95;
    }
    // text
    fill('white');
    textFont("Georgia");
    textSize(50);
    text("Start", this.x - 80, this.y + 10);
  }
}