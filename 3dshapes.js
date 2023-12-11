let angle = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(270);
  rectMode(CENTER);
  fill(0,250,0 );
  noStroke();
  
  translate(mouseX - width/2,mouseY - height/2);


  rotateX(angle);
  rotateY(sqrt(angle));
  rotateZ(angle*0.5);
  // rect(0,0,100,200);
  // box(100,200,100);
  torus(200,50);
  angle+=0.01;
}
