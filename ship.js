function Ship() {
  this.r = 20;
  this.poly = [];
  this.poly[0] = createVector(-this.r, this.r);
  this.poly[1] = createVector(this.r, this.r);
  this.poly[2] = createVector(0, -this.r);
  this.poly[3] = createVector(-this.r, this.r);
  this.pos = createVector(width / 2, height / 3);
  this.heading = 0;
  this.headingV = p5.Vector.fromAngle(radians(this.heading));
  this.targetHeading = 0;
  this.vel = createVector(0, 0);
  this.maxSpeed = 10;
  this.currentColour = color(220, 220, 220);
  this.intendedColour = this.currentColour;
  this.colourSteps = [];
  this.currentColourStep = 0;

  this.update = function() {
    if (this.heading != this.targetHeading) {
      this.heading = lerp(this.heading, this.targetHeading, 0.1);
      this.headingV = p5.Vector.fromAngle(radians(this.heading));
    }

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

    if (this.currentColour == this.intendedColour) {
      // do nothing
    } else {
      // change its colour
      this.changeColour(this.currentColourStep);
      this.currentColourStep++;
    }
  }

  this.setColour = function(newColour) {
    this.intendedColour = newColour;
    s = 30;
    // console.log("Set new colour to " + this.intendedColour + " in " + s + " steps.");
    this.colourSteps = [];
    for (i = 0; i < s; i++) {
      this.colourSteps[i] = lerpColor(this.currentColour, this.intendedColour, (1 / s) * i);
    }
    this.colourSteps.push(newColour);
    this.currentColourStep = 0;
  }

  this.changeColour = function(step) {
    // console.log("Changing colour to " + this.colourSteps[step]);
    this.currentColour = this.colourSteps[step];
  }

  this.boost = function() {
    let force = p5.Vector.fromAngle(this.heading).setMag(0.2);
    this.vel.add(force);
    this.vel.limit(this.maxSpeed);
    // Draw thrusters
    push();
    colorMode(RGB, 255, 255, 255, 1);
    noStroke();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    fill(255, 0, 0, random(0.2, 1));
    triangle(-this.r / 3, this.r * 2, this.r / 3, this.r * 2, 0, this.r);
    pop();
  }

  this.render = function() {

    // Create the vertices of the ship's polygon, assuming 0,0 centre
    this.poly[0] = createVector(-this.r, this.r);
    this.poly[1] = createVector(this.r, this.r);
    this.poly[2] = createVector(0, -this.r);
    this.poly[3] = createVector(-this.r, this.r);
    // now rotate each point about 0,0, then add the ship's position
    for (let i = 0; i < this.poly.length; i++) {
      this.poly[i] = this.poly[i].rotate(this.heading + PI / 2);
      this.poly[i].add(this.pos);
    }

    // We can now draw the ship at its correct location
    // based on 0,0 and no rotation because we've already accounted for that!
    push();
    fill(this.currentColour);
    noStroke();
    // stroke(255);
    beginShape();
    vertex(this.poly[0].x, this.poly[0].y);
    vertex(this.poly[1].x, this.poly[1].y);
    vertex(this.poly[2].x, this.poly[2].y);
    endShape(CLOSE);
    pop();
  }

  this.turn = function(angle) {
    this.targetHeading += angle;
    // Draw thrusters
    push();
    colorMode(RGB, 255, 255, 255, 1);
    noStroke();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    fill(255, 0, 0, random(0.2, 1));
    if (angle > 0) {
      triangle(-this.r / 5 - (this.r / 2), this.r * 1.5, this.r / 5 - (this.r / 2), this.r * 1.5, 0 - (this.r / 2), this.r);
    } else {
      triangle(-this.r / 5 + (this.r / 2), this.r * 1.5, this.r / 5 + (this.r / 2), this.r * 1.5, 0 + (this.r / 2), this.r);
    }
    pop();
  }

  this.collides = function(asteroid) {
    return (collidePolyPoly(this.poly, asteroid.poly));
  }

}
