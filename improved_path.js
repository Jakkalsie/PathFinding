pathfind = function (input_matrix) {
	let startx = input_matrix.start[0].x;
	let starty = input_matrix.start[0].y;
	let endx = input_matrix.end[0].x;
	let endy = input_matrix.end[0].y;

	let start = [dist(startx, starty, endx, endy), createVector(input_matrix.start[1].x, input_matrix.start[1].y), 0, 0, 0];

	this.openCells = [start];
	this.closedCells = [];
	this.currentbx = input_matrix.end[1].x;
	this.currentby = input_matrix.end[1].y;

	this.Found = false;

	this.search = function () {
		//Sorting open cells
		this.openCells.sort(function(a, b){return a[0] - b[0]});

		//Adding current to closed
		let current = this.openCells[0];
		this.openCells.shift();
		this.closedCells.unshift(current);

		//Check if it is final
		if (current[1].x === this.currentbx && current[1].y === this.currentby) {
			this.Found = true;
		}

		//Change Color
		if (input_matrix.cells[current[1].x][current[1].y][1] !== 4 && this.Found === false) {
			input_matrix.cells[current[1].x][current[1].y][1] = 2;
		}

		//Define neighbours
		let neighbours = [];
		for (var i = -1; i < 2; i++) {
			let conx = current[1].x + i < num_cells && current[1].x + i > -1;
			for (var j = -1; j < 2; j++) {
				let cony = current[1].y + j < num_cells && current[1].y + j > -1;

				if (conx && cony) {
					let cx = input_matrix.cells[current[1].x + i][current[1].y + j][0].x;
					let cy = input_matrix.cells[current[1].x + i][current[1].y + j][0].y;
					let distStart = dist(cx, cy, startx, starty);
					let distEnd = dist(cx, cy, endx, endy);
					let color = input_matrix.cells[current[1].x + i][current[1].y + j][1];
					let cost = distStart + distEnd;
					let vec = createVector(current[1].x + i, current[1].y + j);

					neighbours.push([cost, vec, color, current[1].x, current[1].y]);
				} 
			}
		}

		//Define possible neighbours
		let open_neighbours = [];
		for (neighbour of neighbours) {
			let add_neighbour = true;

			for (cell of this.closedCells) {
				let conClosed = cell[1].x === neighbour[1].x && cell[1].y === neighbour[1].y;
				if (conClosed) {
					add_neighbour = false;
				}
			}

			let conTravel = neighbour[2] === 0 || neighbour[2] === 5;     
			if (add_neighbour && conTravel) {
				open_neighbours.push(neighbour);
			}
		}
		
		//Check if they are busy
		for (neighbour of open_neighbours) {
			let in_open = false;
			for (cell of this.openCells) {
				let conOpen = cell[1].x === neighbour[1].x && cell[1].y === neighbour[1].y;
				if (conOpen) {
					in_open = true;
				}
			}

			//Final Add neighbour
			if (in_open === false) {
				neighbour[2] == 2;
				this.openCells.push(neighbour);	
			}
		}
	}

	this.trace = function () {
		let conColor = input_matrix.cells[this.currentbx][this.currentby][1] != 5 && input_matrix.cells[this.currentbx][this.currentby][1] != 4;
		if (conColor) {
			input_matrix.cells[this.currentbx][this.currentby][1] = 3;
			console.log(this.currentbx, this.currentby);
			console.log(input_matrix.cells[this.currentbx][this.currentby][1]);
		}
		
		let current;
		for (cell of this.closedCells) {
			if (cell[1].x === this.currentbx && cell[1].y === this.currentby) {
				current = cell;
			}
		}

		let parent;
		for (cell of this.closedCells) {
			if (cell[1].x === current[3] && cell[1].y === current[4]) {
				parent = cell;
			}
		}

		this.currentbx = parent[1].x;
		this.currentby = parent[1].y;

	}
} 