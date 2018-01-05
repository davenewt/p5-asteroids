function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 20;
  this.heading = 0;
  this.vel = createVector(0, 0);
  this.maxSpeed = 10;

  this.update = function() {
    // console.log(keyCode);
    if (keyIsDown(39)) { // right arrow
      ship.turn(0.1);
    } else if (keyIsDown(37)) { // left arrow
      ship.turn(-0.1);
    }
    if (keyIsDown(38)) { // up arrow
      ship.boost();
    }

    // Add any velocity to the ship's position
    this.pos.add(this.vel);
    // Each time through update, dampen the velocity a little, slow gradually if no boost being added
    this.vel.mult(0.99);

    // Wrap around screen
    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    }
  }

  this.boost = function() {
    let force = p5.Vector.fromAngle(this.heading).setMag(0.2);
    this.vel.add(force);
    this.vel.limit(this.maxSpeed);

    // Draw thrusters
    colorMode(RGB, 255, 255, 255, 1);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    fill(255, 0, 0, random(0.4, 0.8));
    triangle(-this.r / 5, this.r * 2, this.r / 5, this.r * 2, 0, this.r);
    pop();
  }

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    fill(0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  // draw tip of ship for visual reference
  // push();
  // translate(0, -this.r + this.r / 5);
  // fill(255);
  // triangle(-this.r / 5, this.r / 5, this.r / 5, this.r / 5, 0, -this.r / 5);
  // pop();
  }

  this.turn = function(angle) {
    this.heading += angle;
  }
}
