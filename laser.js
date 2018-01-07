function Laser(spos, angle) {
  this.pos = createVector(spos.x, spos.y);
  this.prePos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);

  this.update = function() {
    this.prePos = this.pos.copy();
    this.pos.add(this.vel);
  }

  this.render = function() {
    push();
    stroke(255);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.prePos.x, this.prePos.y);
    pop();
  }

  this.collides = function(asteroid) {
    return (collideLinePoly(this.pos.x, this.pos.y, this.prePos.x, this.prePos.y, asteroid.poly));
  }
}
