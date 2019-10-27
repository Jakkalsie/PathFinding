Cell_Matrix = function (num_cells) {
	this.cells = [];
	this.cellsize = width / (num_cells + 1);

	this.hasStart = false;
	this.hasEnd = false;

	this.start = [createVector(0, 0), createVector(0, 0)];
	this.end = [createVector(0, 0), createVector(num_cells - 1, num_cells - 1)];

	this.populate = function () {
		let offset = this.cellsize / num_cells;

		for (var row = 0; row < num_cells; row++) {
			this.cells.push([]);

			for (var col = 0; col < num_cells; col++) {

				let posx = col * (offset + this.cellsize);
				let posy = row * (offset + this.cellsize);

				this.cells[row].push([createVector(posx, posy), 0]);
			}
		}

		let endpos = this.cells[num_cells - 1][num_cells - 1][0].x;
		this.end[0] = createVector(endpos, endpos);
	}

	this.show = function () {
		for (row of this.cells) {
			for (cell of row) {

				if (cell[1] === 0) {
					fill(color('white'));
				} else if (cell[1] === 1) {
					fill(color('grey'));
				} else if (cell[1] === 2) {
					fill(color('yellow'));
				} else if (cell[1] === 3) {
					fill(color('blue'));
				} else if (cell[1] === 4) {
					fill(color('green'));
				} else if (cell[1] === 5) {
					fill(color('red'));
				}

				rect(cell[0].x, cell[0].y, this.cellsize, this.cellsize);
			}
		}
	}

	this.cellSolidify = function (testing_cell, both_tests) {
		let posx = testing_cell[0].x;
		let posy = testing_cell[0].y;

		let conX = mouseX >= posx && mouseX < posx + this.cellsize;
		let conY = mouseY >= posy && mouseY < posy + this.cellsize;
		let conC = testing_cell[1] === 0;
		
		if (conY && conX && conC) {
			testing_cell[1] = 1;

		} else if (conY && conX && both_tests) {
			testing_cell[1] = 0;
		}
	}

	this.setSE = function (x, y) {
		let posx = this.cells[x][y][0].x;
		let posy = this.cells[x][y][0].y;

		let conX = mouseX >= posx && mouseX < posx + this.cellsize;
		let conY = mouseY >= posy && mouseY < posy + this.cellsize;
		let conC = this.cells[x][y][1] === 0;

		if (conY && conX && this.hasStart === false) {
			this.hasStart = true;
			this.start[0] = this.cells[x][y][0];
			this.start[1] = createVector(x, y);
			this.cells[x][y][1] = 4;

		} else if (conY && conX && this.hasStart && this.hasEnd === false) {
			this.hasEnd = true;
			this.end[0] = this.cells[x][y][0];
			this.end[1] = createVector(x, y);
			this.cells[x][y][1] = 5;
		}
	}
}