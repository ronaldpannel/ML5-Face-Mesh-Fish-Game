class ExParticle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.acc = -0.01;
    this.gravity = 0.5;
    this.lifeSpan = 255;
  }
  draw() {
    image(
      bubble,
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.radius,
      this.radius
    );
  }
  update() {
    this.vx += this.acc;
    this.vy += this.acc;
    this.x += this.vx;
    this.y += this.vy;
  }
}
