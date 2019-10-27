// Made by Dirk Beukes
// Solidify blocks by clicking on them
// Press 's' to find path 

let matrix, num_cells;
let path, startPath;

function setup () {
	createCanvas(800, 800);
	frameRate(20);

	num_cells = parseInt(prompt('Enter the size of your matrix:', ''));
	matrix = new Cell_Matrix(num_cells);
	matrix.populate();

	startPath = false;
}


function draw () {
	background(51);
	matrix.show();

	if (startPath && path.Found === false) {
		path.search();
	}

	if (path && path.Found) {
		path.trace();
	}
}

function mousePressed(both) {
	if (keyIsDown(CONTROL)) {
		for (var row = 0; row < matrix.cells.length; row++) {
			for (var cell = 0; cell < matrix.cells[row].length; cell++) {
				matrix.setSE(cell, row);
			}
		}
	} else {
		for (row of matrix.cells) {
			for (cell of row) {
				matrix.cellSolidify(cell, both, false);
			}
		}	
	}


}

function mouseDragged () {
	mousePressed(false);
}

function keyPressed() {
	if (keyCode === 83) {
		startPath = true;
		path = new pathfind(matrix);
	}
}