class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 80;
    this.speed = Math.random() * 2 + 2;
    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
    this.maxFrame = 3;
    this.frameX = 0;
    this.frameY = 0;
  }
  draw() {
    //image(image,dx, dy, dw, dh,sx, sy,sw. sh)
    image(
      fishImg,
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.spriteWidth / 4,
      this.spriteHeight / 4,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight
    );
    // noFill()
    // strokeWeight(6)
    // circle(this.x, this.y, this.radius);
  }
  update() {
    this.x -= this.speed;
    for (let i = fishes.length - 1; i > 0; i--) {
      if (fishes[i].x < -50) {
        fishes.splice(i, 1);
      }
    }

    if (this.frameX < this.maxFrame) {
      if(floor(frameRate() % random(10, 15)) == 0){
      this.frameX++;
      }
    } else {
      this.frameX = 0;
    }
  }
}
