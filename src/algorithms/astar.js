/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
const grid = [];

function heuristic(a, b) {
	// var d = p5.dist(a.i, b.i, a.j, b.j);
	const d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
	return d;
}

function Node(i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.previous = undefined;
	this.block = false;

	this.addNeighbors = function addNeighbors(board, rows, cols) {
		const { i } = this;
		const { j } = this;

		if (i < cols - 1) this.neighbors.push(board[i + 1][j]);
		if (i > 0) this.neighbors.push(board[i - 1][j]);
		if (j < rows - 1) this.neighbors.push(board[i][j + 1]);
		if (j > 0) this.neighbors.push(board[i][j - 1]);
	};
}

const setup = (rows, cols) => {
	// making 2D array
	for (let i = 0; i < cols; i += 1) {
		grid[i] = new Array(rows);
	}

	for (let i = 0; i < cols; i += 1) {
		for (let j = 0; j < rows; j += 1) {
			grid[i][j] = new Node(i, j);
		}
	}

	for (let i = 0; i < cols; i += 1) {
		for (let j = 0; j < rows; j += 1) {
			grid[i][j].addNeighbors(grid, rows, cols);
		}
	}
};

// eslint-disable-next-line import/prefer-default-export
export function astarAlgorithm(rows, cols, startX, startY, endX, endY) {
	let startTime = Date.now();
	let openSet = [];
	const closedSet = [];
	let start;
	let end;
	const path = [];
	let endTime;
	let time;

	startTime = Date.now();
	setup(rows, cols);

	start = grid[startX][startY];
	end = grid[endX][endY];

	openSet.push(start);

	while (openSet.length > 0) {
		let lowestIndex = 0;
		for (let i = 0; i < openSet.length; i += 1) {
			if (openSet[i].f < openSet[lowestIndex].f) {
				lowestIndex = i;
			}
		}

		const current = openSet[lowestIndex];

		if (current === end) {
			endTime = Date.now();
			time = (endTime - startTime) / 1000;
			let temp = current;
			path.push(temp);
			while (temp.previous) {
				path.push(temp.previous);
				temp = temp.previous;
			}

			return [true, path, closedSet, time];
		}

		openSet = openSet.filter(el => current !== el);
		closedSet.push(current);

		const { neighbors } = current;

		for (let i = 0; i < neighbors.length; i += 1) {
			const neighbor = neighbors[i];

			if (!closedSet.includes(neighbor) && !neighbor.block) {
				const tempG = current.g + 1;

				let newPath = false;
				if (openSet.includes(neighbor)) {
					if (tempG < neighbor.g) {
						neighbor.g = tempG;
						newPath = true;
					}
				} else {
					neighbor.g = tempG;
					newPath = true;
					openSet.push(neighbor);
				}

				if (newPath) {
					neighbor.h = heuristic(neighbor, end);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = current;
				}
			}
		}
	}

	endTime = Date.now();
	time = (endTime - startTime) / 1000;
	return [false, path, closedSet, time];
}
