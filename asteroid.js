function Asteroid(pos, r) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(width), random(height));
  }
  if (r) {
    this.r = r / 2;
  } else {
    this.r = random(10, asteroidMaxSize);
  }
  // Smaller asteroids will move faster
  this.vel = p5.Vector.random2D().mult(map(this.r, 0, asteroidMaxSize, 1.5, 0.5));
  // Some small asteroids will move even faster
  if (this.r < asteroidMaxSize / 4 && random(1) > 0.95) {
    this.vel = this.vel.mult(2);
  }
  // make sure we don't have any REALLY SLOW asteroids
  if (this.vel < 0.5) {
    this.vel = 0.5;
  }
  this.vertices = random(8, 12);
  this.offset = [];
  for (let i = 0; i < this.vertices; i++) {
    this.offset[i] = random(this.r / 2);
  }
  this.angle = 0;
  this.rotationSpeed = random(-0.01, 0.01);
  if ((abs(this.rotationSpeed) > 0.008) && (this.r < asteroidMaxSize / 2)) {
    this.rotationSpeed = this.rotationSpeed * 10; // some (small) asteroids will spin fast!
  }

  this.render = function() {
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    // ellipse(0, 0, this.r * 2, this.r * 2);
    beginShape();
    for (let i = 0; i < this.vertices; i++) {
      let angle = map(i, 0, this.vertices, 0, TWO_PI);
      let r = this.r + this.offset[i];
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  this.update = function() {
    this.pos.add(this.vel);
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
    this.angle += this.rotationSpeed;
  }

  this.breakup = function() {
    let newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }

}
