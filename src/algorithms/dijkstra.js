/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
const grid = [];

function Graph(i, j) {
	this.i = i;
	this.j = j;
	this.visited = false;
	this.distance = Infinity;
	this.previousNode = undefined;
	this.block = false;
	this.neighbors = [];

	this.addNeighbors = function addNeighbors(board, rows, cols) {
		const { i } = this;
		const { j } = this;

		if (i < cols - 1) this.neighbors.push(board[i + 1][j]);
		if (i > 0) this.neighbors.push(board[i - 1][j]);
		if (j < rows - 1) this.neighbors.push(board[i][j + 1]);
		if (j > 0) this.neighbors.push(board[i][j - 1]);
	};
}

function sortNodesByDistance(unvisitedNodes) {
	return unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

const setup = (rows, cols, blocks) => {
	// making 2D array
	for (let i = 0; i < cols; i += 1) {
		grid[i] = new Array(rows);
	}

	for (let i = 0; i < cols; i += 1) {
		for (let j = 0; j < rows; j += 1) {
			grid[i][j] = new Graph(i, j);
		}
	}

	for (let i = 0; i < cols; i += 1) {
		for (let j = 0; j < rows; j += 1) {
			grid[i][j].addNeighbors(grid, rows, cols);
		}
	}

	if (blocks.length !== 0) {
		for (let i = 0; i < cols; i += 1) {
			for (let j = 0; j < rows; j += 1) {
				for (let k = 0; k < blocks.length; k += 1) {
					if (grid[i][j].i === blocks[k][1] && grid[i][j].j === blocks[k][0]) {
						grid[i][j].block = true;
					}
				}
			}
		}
	}
};

export default function dijkstraAlgorithm(rows, cols, startX, startY, endX, endY, blocks) {
	const startTime = Date.now();
	let endTime;
	let time;
	let start;
	let end;
	let unvisitedNodes = [];
	const visitedNodes = [];
	const path = [];

	setup(rows, cols, blocks);

	start = grid[startX][startY];
	end = grid[endX][endY];

	unvisitedNodes.push(start);

	start.distance = 0;

	while (unvisitedNodes.length > 0) {
		unvisitedNodes = sortNodesByDistance(unvisitedNodes);
		let closestNode = unvisitedNodes.shift();

		if (closestNode.distance === Infinity) {
			return [false, path, visitedNodes, time];
		}
		closestNode.visited = true;
		visitedNodes.push(closestNode);

		if (closestNode === end) {
			endTime = Date.now();
			time = Math.abs((endTime - startTime) / 1000);
			let temp = closestNode;
			path.push(temp);
			while (temp.previousNode) {
				path.push(temp.previousNode);
				temp = temp.previousNode;
			}

			return [true, path, visitedNodes, time];
		}

		let { neighbors } = closestNode;

		for (let i = 0; i < neighbors.length; i += 1) {
			if (neighbors[i].visited === false && !neighbors[i].block) {
				neighbors[i].visited = true;
				neighbors[i].distance = closestNode.distance + 1;
				neighbors[i].previousNode = closestNode;
				unvisitedNodes.push(neighbors[i]);
			}
		}
	}

	return [false, path, visitedNodes, time];
}
