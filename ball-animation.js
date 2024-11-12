let maxRadius = 20;
let spikeImage;
var balls = [];

function preload() {
  spikeImage = loadImage('spike_ball.png');
}

function setup() {
  createCanvas(700, 600);

  // Spawning an ammount of balls;
  for (var i = 0; i < 10; i++) {
    let ball = new Ball(i);
    balls.push(ball);
  }
}

function draw() {
  background(120);

  if (mouseIsPressed) { // for checking if mouse is being held;

    // Dealing with balls on click (coloring or deleting);
    // for (let i = balls.length - 1; i >= 0; i--) {
    //   // Coloring on click;
    //   // if (balls[i].under_mouse(mouseX, mouseY)) {
    //   //   balls[i].clicked(mouseX, mouseY);
    //   // }

    //   // // Deleting on click;
    //   // if (balls[i].under_mouse(mouseX, mouseY)) {
    //   //   balls.splice(i, 1);
    //   }
    // }

    // // Spawning the balls on click;
    // if (mouseX > maxRadius && mouseY > maxRadius && mouseX < width - maxRadius && mouseY < height - maxRadius) {
    //   let ball = new Ball(mouseX, mouseY);
    //   balls.push(ball);
    // }
    // // Deleting the balls after they have overpopulated;
    // if (balls.length > 20) {
    //   balls.splice(0,1);
    // }
  }

  // ball animation;
  for (var j = 0; j < balls.length; j++) { // Use "for...of" to iterate through the balls array

    balls[j].bounce();
    balls[j].move();

    // if mouse is covering balls, display gray; otherwise don't change the color;
    if (balls[j].under_mouse(mouseX, mouseY)) {
      balls[j].show(255, 255, 255);
    } else {
      balls[j].show(balls[j].color_r, balls[j].color_g, balls[j].color_b);
    }
  }
}

class Ball {
  constructor(i) {
    this.radius = random(1, maxRadius * 2)
    this.px = 0;
    this.py = 0;
    this.find_spawn()
    this.x = this.px;
    this.y = this.py;
    // this.x = x;
    // this.y = y;
    this.vX = 0;
    this.vY = 0;
    this.dX = 0;
    this.dY = 0;
    this.color_r = 255;
    this.color_b = 255;
    this.color_g = 255;
    this.collidedX = false;
    this.collidedY = false;
    this.collidedB = false;
    this.number = i;
  }

  intersects() {
    for (let i = 0; i < balls.length; i++) {
      if (balls[i] !== this) {
        let d = dist(this.dX, this.dY, balls[i].dX, balls[i].dY);
        if (d < this.radius + balls[i].radius) {
          return true;
        }
      }
    }
  }

  find_spawn() {
    while (true) {
      this.px = random(this.radius, width - this.radius);
      this.py = random(this.radius, height - this.radius);
      let collided = false;

      for (let i = 0; i < balls.length; i++) {
        if (balls[i] !== this) {
          let d = dist(this.px, this.py, balls[i].px, balls[i].py);
          if (d < this.radius + balls[i].radius) {
            collided = true;
            break;
          }
        }
      }
      if (!collided) {
        break; // Exit the loop if no collision detected
      }
    }
  }




  under_mouse(tx, ty) {
    return (dist(tx, ty, this.x, this.y) <= this.radius && (this.color_b != 0 && this.color_g != 0 && this.color_r != 0))
  }


  clicked(tx, ty) {
    // Coloring the balls;
    // this.color_b = 0;
    // this.color_r = 0;
    // this.color_g = 0;
    // this.vY += 1;
  }

  move() {
    if (!this.collidedX && !this.collidedY && !this.collidedB) {
      this.x = this.dX
      this.y = this.dY
    }

    this.vX += random(-1, 1) / 10;
    this.vY += random(-1, 1) / 10;

    this.dX += this.vX;
    this.dY += this.vY;
  }

  bounce() {
    // Checking collision with walls;
    if (this.dX - this.radius < 0 || this.dX + this.radius > width) {
      // if (this.dX < 0 || this.dX + this.radius > width) {
      if (!this.collidedB) {
        this.vX *= -1;
      } else {
        this.vX = 0;
      }
      this.dX = this.x;
      this.color_r += random(-15, 15);
      this.color_b += random(-15, 15);
      this.color_g += random(-15, 15);
      this.collidedX = true;
    } else {
      this.x = this.dX;
      this.collidedX = false;
    }

    if (this.dY - this.radius < 0 || this.dY + this.radius > height) {
      // if (this.dY < 0 || this.dY + this.radius > height) {
      if (!this.collidedB) {
        this.vY *= -1;
      } else {
        this.vY = 0;
      }
      this.dY = this.y;
      this.color_r += random(-15, 15);
      this.color_b += random(-15, 15);
      this.color_g += random(-15, 15);
      this.collidedY = true;
    } else {
      this.y = this.dY;
      this.collidedY = false;
    }

    // Checking collision with other balls;
    if (this.intersects()) {
      if (!this.collidedX || !this.collidedY) {
        this.vX *= -1;
        this.vY *= -1;
      } else {
        this.vX = 0;
        this.vY = 0;
      }
      this.collidedB = true;
      this.dY = this.y;
      this.dX = this.x;
      this.color_r += random(-15, 15);
      this.color_b += random(-15, 15);
      this.color_g += random(-15, 15);
    } else {
      this.collidedB = false;
    }
  }

  show(r, g, b) {
    // // Draw as image;
    // image(spikeImage, this.x, this.y, this.radius, this.radius);


    // Draw as circles;
    fill(r, g, b, 200);
    circle(this.x, this.y, this.radius * 2);
    noStroke();

    // // Render the number on the circle
    // fill(0);
    // textAlign(CENTER, CENTER);
    // textSize(20);
    // text(this.number, this.x, this.y);

  }
}


function mousePressed() { // for checking if mouse is pressed once;

}
