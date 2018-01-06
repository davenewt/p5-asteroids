let ship;
let asteroids = [];
let asteroidMaxSize;
let lasers = [];
let score;
let scorePos;
let gameOver;
let gameRunning;
let shotsFired;
let asteroidsHit;

function preload() {
  boldFont = loadFont('fonts/pixelmix/pixelmix_bold.ttf');
  normalFont = loadFont('fonts/pixelmix/pixelmix.ttf');
  gameText = loadStrings('assets/gameText.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  asteroidMaxSize = 60;
  scorePos = createVector(10, 30);
  ship = new Ship();
  resetGame();
}

function resetGame() {
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
  score = 0;
  shotsFired = 0;
  asteroidsHit = 0;
  gameOver = false;
  gameRunning = false;
}

function draw() {
  background(0);

  for (let i = lasers.length - 1; i >= 0; i--) {
    if (lasers[i].pos.x < 0 || lasers[i].pos.x > width || lasers[i].pos.y < 0 || lasers[i].pos.y > height) {
      // if it's off-screen, remove it
      lasers.splice(i, 1);
    } else {
      // otherwise, draw and update it
      lasers[i].render();
      if (gameRunning) {
        lasers[i].update()
      }
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (!gameOver) {
            score = score + floor(asteroids[j].r);
            asteroidsHit++;
          }
          if (asteroids[j].r > 15) {
            let newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);

          break;
        }
      }
    }
  }

  if (asteroids.length == 0) {
    gameOver = true;
  } else {
    for (let j = asteroids.length - 1; j >= 0; j--) {
      if (ship.hits(asteroids[j])) {
        gameOver = true;
      }
      asteroids[j].render();
      if (gameRunning) {
        asteroids[j].update()
      }
    }
  }

  ship.render();
  if (gameRunning) {
    ship.update();
  }

  showScore();
  showText();

}

function keyPressed() {
  // console.log(keyCode);
  if (gameOver) {
    if (keyCode == 82) // 'r' to restart
      resetGame();
  } else if (!gameRunning) {
    gameRunning = true;
  } else if (keyCode == 32) {
    lasers.push(new Laser(ship.pos, ship.heading));
    if (!gameOver) {
      shotsFired++;
    }
  }
}

function showScore() {
  if (shotsFired == 0 || asteroidsHit == 0) {
    scoreText = "Score " + score;
  } else {
    let acc = floor((100 / shotsFired) * asteroidsHit);
    scoreText = "Score " + score + "  Accuracy " + acc + "%";
  }
  push();
  translate(0, 0);
  noStroke();
  if (gameOver) {
    scoreText += "  GAME OVER!";
    if (asteroids.length == 0) {
      // Game over because player has destroyed all asteroids!
      scoreText += "  YOU WON!";
      fill(0, 100, 0);
    } else {
      // Game over because player died!
      fill(100, 0, 0);
    }
  } else {
    fill(20, 20, 20);
  }
  rect(5, 5, width - scorePos.x, scorePos.y + 5);
  //
  // stroke(255, 255, 255, 0.2);
  // strokeWeight(2);
  // line(scorePos.x, scorePos.y + 5, width - scorePos.x, scorePos.y + 5);
  //
  fill(200, 200, 200);
  textFont(normalFont);
  textSize(12);
  text(scoreText, scorePos.x, scorePos.y);
  pop();
// console.log("Score shown");
}

function showText() {
  push();
  translate(0, 0);
  fill(0, 255, 0);
  noStroke();
  textFont(boldFont);
  textAlign(CENTER);
  textSize(24);
  let lineSpacing = 40;
  if (!gameRunning && !gameOver) {
    text(gameText[0], width / 2, height / 2);
    text(gameText[1], width / 2, height / 2 + lineSpacing);
  } else if (gameOver) {
    text(gameText[2], width / 2, height / 2);
    text(gameText[3], width / 2, height / 2 + lineSpacing);
  }
  pop();
}
