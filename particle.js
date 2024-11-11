class Particle {
  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.radius = radius;
    this.velocity = createVector(0, 9);
    this.acc = createVector(0, 0);
    this.gravity = 0.099;
    this.hue = 0;
    // this.image = document.getElementById('bubble')
  }
  update() {
    this.velocity = createVector(random(0, 0), random(-1, -2));
    this.acc = createVector(random(0.5, -0.5), random(-1, -1));
    this.velocity.add(this.acc);
    this.pos.add(this.velocity);
    this.acc.mult(this.gravity);
    this.acc.mult(0);
    if (this.hue < 360) {
      this.hue += 2;
    } else {
      this.hue = 0;
    }
    for(let i = particles.length-1; i > 0; i-- ){
      if(particles[i].pos.y < -50){
        particles.splice(i, 1)
      }
    }
  }
  draw() {
    image(
      bubble,
      this.pos.x - this.radius / 2,
      this.pos.y - this.radius / 2,
      this.radius,
      this.radius
    );
    

    // circle(this.pos.x, this.pos.y, this.radius - 10);
    // stroke(`hsl(${this.hue}, 100%, 50%)`);
    // noFill();
  }
}
