// plane overlays using the same figure in multiple instances

// change the size of the first cross
initialSize = 128;


let w = 700;
let h = 700;

let grid;

// change if uniform color is needed for each level
let randomColors;

const rainbowColors = [
  '#FF0000', // Red
  '#FF7F00', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#0000FF', // Blue
  '#4B0082', // Indigo
  '#9400D3', // Violet
  '#800080'  // Purple
];


function setup() {
  createCanvas(w, h);
  background(255);
  
  // randomColors = generateRandomColors(10);
  randomColors = generateRandomColors(10);

  // Initialize the grid
  grid = createGrid(w, h);

  fillGrid();
}

function draw() {
  // Draw the grid

  drawGrid();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas(canvas, 'myCanvas', 'png');
  }
}

function generateRandomColors(n) {
  let colors = [];
  for (let i = 0; i < n; i++) {
    let randomColor = color(random(255), random(255), random(255));
    colors.push(randomColor);
  }
  return colors;
}


function fillGrid() {
    let size = initialSize;
    let currentX = Math.floor(w / 2) - size / 2;
    let currentY = Math.floor(h / 2) - size / 2;
    drawCross(size, currentX, currentY, color(0))
    
}

function drawCross(size, x, y, col) {
  for (let i = x - size; i < x + 2 * size && i > 0 && i < w; i++) {
      for (let j = y; j < y + size && j > 0 && j < h; j++) {
          grid[i][j] = col
          // grid[i][j] = randomColors[Math.log2(size)]
          // grid[i][j] = rainbowColors[Math.log2(size)]
 
      }
  }
  for (let i = y - size; i < y + 2 * size && i > 0 && i < h; i++) {
    for (let j = x; j < x + size && j > 0 && j < w; j++) {
        grid[j][i] = col
        // grid[j][i] = randomColors[Math.log2(size)]
        // grid[j][i] = rainbowColors[Math.log2(size)]
    }
  }

  if (size == 1) {
    return;
  }
  else{
    col = color(random(255), random(255), random(255))
    drawCross(size / 2, x + 1.5 * size, y - size, col)
    drawCross(size / 2, x - size, y - size, col)
    drawCross(size / 2, x + 1.5 * size, y + 1.5 * size, col)
    drawCross(size / 2, x - size, y + 1.5 * size, col)
  }


}

function createGrid(rows, cols) {
  let grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}

function drawGrid() {
  let cellSize = width / grid.length; 
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let x = i * cellSize;
      let y = j * cellSize;
      if (grid[i][j] == 0) {
        fill(255);
      }
      else{
        fill(grid[i][j]); 
      }
      noStroke();
      rect(x, y, cellSize, cellSize);
    }
  }
}