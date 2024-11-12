class Waves {
  constructor() {
    this.x = 0;
    this.x = 0;
    this.y = 0;
    this.width = width
    this.height = height
    
    this.speed = -0.5;
  }

  draw() {
    image(bgImage, this.x, this.y, this.width);
    image(bgImage, this.x + this.width, this.y, this.width);
  
  }
  update() {
     this.width = width;
     this.height = height;
    this.x += this.speed;
    if(this.x <= -this.width){
        this.x = 0
    }
    this.x = floor(this.x + this.speed)
   
  }
}
