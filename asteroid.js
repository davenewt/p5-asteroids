function Asteroid(pos, r, vel) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(-width, 0), random(-height, 0));
  // this.pos = createVector(width / 2, height / 2 + 200);
  }
  if (r) {
    this.r = r / 2;
  } else {
    this.r = random(10, asteroidMaxSize);
  }
  if (vel) {
    // If vel is passed in, generate new vel which is similar
    // so large asteroids that break into smaller ones result in
    // the smaller ones going in a similar direction.
    this.vel = vel;
  } else {
    // Smaller asteroids will move faster
    this.vel = p5.Vector.random2D().mult(map(this.r, 0, asteroidMaxSize, 1.5, 0.5));
  // this.vel = p5.Vector.random2D().mult(map(this.r, 0, asteroidMaxSize, 0, 0));
  }
  // Some small asteroids will move even faster
  if (this.r < asteroidMaxSize / 4 && random(1) > 0.95) {
    this.vel = this.vel.mult(2);
  }
  // make sure we don't have any REALLY SLOW asteroids
  if (this.vel < 0.5) {
    this.vel = 0.5;
  }
  this.vertices = random(8, 12);
  // this.vertices = 5;
  this.poly = []; // generate a poly (array of points) for collision detection
  this.offset = [];

  for (let i = 0; i < this.vertices; i++) {
    this.offset[i] = random(this.r / 2);
  }
  this.angle = 0;
  this.rotationSpeed = random(-0.01, 0.01);
  if ((abs(this.rotationSpeed) > 0.008) && (this.r < asteroidMaxSize / 2)) {
    this.rotationSpeed = this.rotationSpeed * 5; // some (small) asteroids will spin fast!
  }

  this.render = function() {

    // FIRST create the vertices of the polygon, assuming 0,0 centre
    // This polygon is used for collision detection as well as drawing
    let inverseVertexAngle = 1 / this.vertices * TWO_PI;
    for (let i = 0; i < this.vertices; i++) {
      // let angle = map(i, 0, this.vertices, 0, TWO_PI);
      // let angle = i / this.vertices * TWO_PI;
      let angle = i * inverseVertexAngle;
      let r = this.r + this.offset[i];
      let x = r * cos(angle);
      let y = r * sin(angle);
      this.poly[i] = createVector(x, y);
    }
    // THEN rotate the asteroid
    // THEN move it to its actual position
    for (let i = 0; i < this.vertices; i++) {
      this.poly[i] = this.poly[i].rotate(this.angle + PI / 2);
      this.poly[i].add(this.pos);
    }
    // FINALLY draw it
    push();
    // stroke(255);
    noStroke();
    fill(80);
    beginShape();
    for (let i = 0; i < this.vertices; i++) {
      vertex(this.poly[i].x, this.poly[i].y);
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
