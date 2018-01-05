let ship;
let asteroids = [];
let lasers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  // console.log(ship);
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
  // console.log(asteroids.length);

  for (let i = lasers.length - 1; i >= 0; i--) {
    if (lasers[i].pos.x < 0 || lasers[i].pos.x > width || lasers[i].pos.y < 0 || lasers[i].pos.y > height) {
      // if it's off-screen, remove it
      lasers.splice(i, 1);
    } else {
      // otherwise, draw and update it
      lasers[i].render();
      lasers[i].update();
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
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
    asteroids[j].render();
    asteroids[j].update();
  }

  ship.render(); // render the ship first, because updating could draw the thrusters etc.
  ship.update();

}

function keyPressed() { // spacebar
  // fire a laser
  if (keyCode == 32) {
    // console.log("Pew!");
    lasers.push(new Laser(ship.pos, ship.heading));
  }
}
