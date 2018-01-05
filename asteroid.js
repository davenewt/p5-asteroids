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
  this.vel = p5.Vector.random2D();
  this.vertices = random(8, 12);
  this.offset = [];
  for (let i = 0; i < this.vertices; i++) {
    this.offset[i] = random(this.r / 2);
  }


  this.render = function() {
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
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
  }

  this.breakup = function() {
    let newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }

}
