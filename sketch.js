let previousLipDistance;
let particles = [];
let particleNum = 1;
let bubble;
let bubSound1;
let bubSound2;
let fishImg;
let enemyImg;
let fishes = [];
let enemies = [];
let fishNum = 1;
let canvas;
let score = 0;
let scoreText = "";
let overlay;
let gameEnd;

//ml5.js

let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipped: true };

function preload() {
  // Load the handPose model
  faceMesh = ml5.faceMesh(options);
  bubble = loadImage("bubble_pop_frame_01.png");
  fishImg = loadImage("swimmingFishLeft.png");
  enemyImg = loadImage("enemy1.png");
  bubSound1 = loadSound("bubblePop1.wav");
  bubSound2 = loadSound("bubblePop2.wav");
}

function setup() {
  canvas = createCanvas(640, 480);
  canvas.parent(container);
  overlay = createGraphics(640, 480);
  // overlay.background(0);
  gameEnd = false;
  //Create the webcam video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
  setInterval(() => {
    let x = width + 50;
    let y = random(50, height / 2);
    fishes.push(new Fish(x, y));
  }, floor(random(1000, 2000)));

  setInterval(() => {
    let x = width + 50;
    let y = random(50, height / 2);
    enemies.push(new Enemy(x, y));
  }, floor(random(3000, 5000)));
}

function draw() {
  background(0);
  image(video, 0, 0);

  image(overlay, 0, 0);

  if (faces.length > 0 && faces[0].lips) {
    let topLeftLip = createVector(faces[0].lips.x, faces[0].lips.y);
    let bottomRightLip = createVector(
      faces[0].lips.x + faces[0].lips.width,
      faces[0].lips.y + faces[0].lips.height
    );
    let centerLip = createVector(faces[0].lips.centerX, faces[0].lips.centerY);
    // stroke(0, 255, 0);
    // noFill();
    // ellipse(topLeftLip.x, topLeftLip.y, 10, 10);
    // ellipse(bottomRightLip.x, bottomRightLip.y, 10, 10);
    // ellipse(centerLip.x, centerLip.y, 10, 10);

    let lipDistance = dist(
      topLeftLip.x,
      topLeftLip.y,
      bottomRightLip.x,
      bottomRightLip.y
    );
    if (previousLipDistance > 50 && previousLipDistance - lipDistance > 5) {
      for (let i = 0; i < particleNum; i++) {
        let mouth = createVector(centerLip.x, centerLip.y);
        let radius = 50;
        particles.push(new Particle(mouth.x, mouth.y, radius));
        bubSound2.play();

        // trigger(rings[i][j], mouth);
      }
    }
    previousLipDistance = lipDistance;
  }

  for (let i = particles.length - 1; i > 0; i--) {
    particles[i].draw();
    particles[i].update();
  }
  for (let i = fishes.length - 1; i > 0; i--) {
    fishes[i].draw();
    fishes[i].update();
  }
  for (let i = enemies.length - 1; i > 0; i--) {
    enemies[i].draw();
    enemies[i].update();
  }
  collision();
  collisionEnemy();
  drawText(scoreText);

  // drawPartsKeypoints();
}

function collision() {
  for (let i = particles.length - 1; i > 1; i--) {
    for (let j = fishes.length - 1; j > 0; j--) {
      let dx = particles[i].pos.x - fishes[j].x;
      let dy = particles[i].pos.y - fishes[j].y;
      let d = Math.hypot(dx, dy);
      if (
        d < particles[i].radius / 2 + fishes[j].radius / 2 &&
        particles.length > 0
      ) {
        if (!gameEnd) {
          score += 10;
        } else {
          score += 0;
        }

        bubSound1.play();
        fishes.splice(j, 1);
      }
    }
  }
}

function collisionEnemy() {
  for (let i = particles.length - 1; i > 1; i--) {
    for (let j = enemies.length - 1; j > 0; j--) {
      let dx = particles[i].pos.x - enemies[j].x;
      let dy = particles[i].pos.y - enemies[j].y;
      let d = Math.hypot(dx, dy);
      if (
        d < particles[i].radius / 2 + enemies[j].radius / 2 &&
        particles.length > 0
      ) {
        console.log("hit");
        bubSound1.play();
        enemies.splice(j, 1);
        gameEnd = true;
        gameOver();
      }
    }
  }
}

// Draw keypoints for specific face element positions
function drawPartsKeypoints() {
  // If there is at least one face
  if (faces.length > 0) {
    for (let i = 0; i < faces[0].lips.keypoints.length; i++) {
      let lips = faces[0].lips.keypoints[i];
      fill(0, 255, 0);
      circle(lips.x, lips.y, 5);
    }
  }
}
// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}

function drawText(scoreText) {
  textSize(25);
  textAlign(CENTER, CENTER);
  scoreText = text(`Score: ${score}`, 60, 20);
  fill(255);
}

function gameOver() {
  overlay.textSize(30);
  overlay.textAlign(CENTER, CENTER);
  overlay.fill(255);
  overlay.text(`Game Over Your Score Was: ${score}`, width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(400, 400);
}
