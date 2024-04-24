// plane overlays using the same figure in multiple instances

let grid;
let w = 1500;
let h = 1000;

let randomColors;



function setup() {
  createCanvas(1000 , 1000);
  background(255);
  
  randomColors = generateRandomColors(10);
  // Initialize the grid
  grid = createGrid(w, h);

  fillGrid();
}

function draw() {
  // Draw the grid

  drawGrid();
}

function generateRandomColors(n) {
  let colors = [];
  for (let i = 0; i < n; i++) {
    let randomColor = color(random(255), random(255), random(255));
    colors.push(randomColor);
  }
  return colors;
}

// Fill the grid
function fillGrid() {
    let size = 256;
    let currentX = Math.floor(w / 2) - size / 2;
    let currentY = Math.floor(h / 2) - size / 2;
    drawCross(size, currentX, currentY, color(0))
    
}

function drawCross(size, x, y, col) {
  for (let i = x - size; i < x + 2 * size && i > 0 && i < w; i++) {
      for (let j = y; j < y + size && j > 0 && j < h; j++) {
        // if (grid[i][j] == 0) {

          // grid[i][j] = col
          grid[i][j] = randomColors[Math.log2(size)]

        // }
        // else {pass}  
      }
  }
  for (let i = y - size; i < y + 2 * size && i > 0 && i < h; i++) {
    for (let j = x; j < x + size && j > 0 && j < w; j++) {
      // if (grid[i][j] == 0)  {  

        // grid[j][i] = col
        grid[j][i] = randomColors[Math.log2(size)]

      // }
      // else {pass}
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

// Function to create a 2D grid
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

// Function to draw the grid
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