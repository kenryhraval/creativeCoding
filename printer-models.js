let printerModel;
let printerImage;
let printer;


class Printer {
  constructor(x, y, z, scale = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.scale = scale;
    this.gravity = 0.1;
    this.velocity = 0;
    this.isFalling = false;
    this.angle = 0;
  }

  update() {
    if (this.isFalling) {
      this.velocity += this.gravity;
      this.y += this.velocity;
      if (this.y > windowHeight / 2) {
        this.y = - windowHeight / 2 - this.scale * 150;
        this.velocity = 0;
      }
      this.angle += 0.05;
    } else {
      this.x = mouseX - width / 2;
      this.y = mouseY - height / 2;
    }
  
  }

  show() {
    push();
    translate(this.x, this.y, this.z);
    rotateX(this.angle);
    rotateY(sqrt(this.angle));
    rotateZ(this.angle * 0.1);

    scale(this.scale);

    texture(printerImage);
    model(printerModel);
    
    pop();
  }

  startFalling() {
    this.isFalling = true;
  }
}

function preload() {
  printerModel = loadModel('material/printer/10107_Computer Printer_v3_L3.obj', true);
  printerImage = loadImage('material/printer/10107_Computer Printer_v1_Diffuse.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  printer = new Printer(mouseX, mouseY, 0, 1);
}

function draw() {
  background(270);
  rectMode(CENTER);
  noStroke();

  ambientLight(150);
  directionalLight(255, 255, 255, 1, 1, 1);

  printer.update();
  printer.show();
}

function mousePressed() {
  printer.startFalling();
}
