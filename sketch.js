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

function setup() {
  createCanvas(windowWidth, windowHeight);
  asteroidMaxSize = 60;
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
  ship = new Ship();
  score = 0;
  shotsFired = 0;
  asteroidsHit = 0;
  gameOver = false;
  gameRunning = false;
  scorePos = createVector(10, 30);
}

function draw() {
  background(0);
  showScore();

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

  for (let j = asteroids.length - 1; j >= 0; j--) {
    if (ship.hits(asteroids[j])) {
      gameOver = true;
    }
    asteroids[j].render();
    if (gameRunning) {
      asteroids[j].update()
    }
  }

  ship.render(); // render the ship first, because updating could draw the thrusters etc.
  if (gameRunning) {
    ship.update()
  }

}

function keyPressed() {
  if (!gameRunning) {
    gameRunning = true;
  }
  if (keyCode == 32) { // spacebar = fire laser
    // console.log("Pew!");
    lasers.push(new Laser(ship.pos, ship.heading));
    if (!gameOver) {
      shotsFired++;
    }
  }
}

function showScore() {
  if (shotsFired == 0 || asteroidsHit == 0) {
    scoreText = "Score: " + score + "  Asteroids: " + asteroids.length;
  } else {
    let acc = floor((100 / shotsFired) * asteroidsHit);
    scoreText = "Score: " + score + "  Asteroids: " + asteroids.length + "  Accuracy: " + acc + "%  (" + asteroidsHit + "/" + shotsFired + ")";
  }
  push();
  translate(0, 0);
  noStroke();
  if (gameOver) {
    scoreText = scoreText + "  GAME OVER!";
    fill(255, 0, 0, 0.5);
  } else {
    fill(255, 255, 255, 0.2);
  }
  rect(5, 5, width - scorePos.x, scorePos.y + 5);
  stroke(255, 255, 255, 0.2);
  strokeWeight(2);
  line(scorePos.x, scorePos.y + 5, width - scorePos.x, scorePos.y + 5);
  fill(255, 255, 255, 0.5);
  textSize(18);
  text(scoreText, scorePos.x, scorePos.y);
  pop();
}
