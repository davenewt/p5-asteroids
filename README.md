# Asteroids (with p5.js)

Based on the coding challenge by Dan Shiffman [here (in two parts)](https://youtu.be/hacZU523FyM).

Play it in your browser >>[here](https://davenewt.github.io/p5-asteroids/)<< :)

## History

### v4.5, 9 Jan 2018:
* Fixed bug in colour-changing for ship.

### v4.4, 9 Jan 2018:
* Fixed bug in collision detection between ship and asteroids (asteroid polys were being calculated/rotated incorrectly)
* Switched to a minified version of p5.collide2D
* Added visual cue to ship colliding with asteroid (fills red and gradually returns to white when no longer colliding)

### v4.3, 8 Jan 2018:
* Applied p5.collide2D to the ship, for more accurate collision detection.

### v4.2, 6 Jan 2018:
* Added p5.collide2D library and implemented collision between ship lasers and asteroids.
