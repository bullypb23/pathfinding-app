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

function getAllNodes(grid, cols, rows) {
	const nodes = [];
	for (let i = 0; i < cols; i += 1) {
		for (let j = 0; j < rows; j += 1) {
			nodes.push(grid[i][j]);
		}
	}
	return nodes;
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

export default function dijkstraAlgorithm(gridSize, startCoords, endCoords, blocks) {
	return new Promise((resolve) => {
		const startTime = Date.now();
		let endTime;
		let time;
		let start;
		let end;
		let unvisitedNodes = [];
		const visitedNodes = [];
		const path = [];

		setup(gridSize.rows, gridSize.cols, blocks);

		start = grid[startCoords.x][startCoords.y];
		end = grid[endCoords.x][endCoords.y];

		start.distance = 0;

		unvisitedNodes = getAllNodes(grid, gridSize.cols, gridSize.rows);

		while (unvisitedNodes.length > 0) {
			unvisitedNodes = sortNodesByDistance(unvisitedNodes);
			let closestNode = unvisitedNodes.shift();

			if (closestNode.distance === Infinity) {
				return ['dijkstra', false, path, visitedNodes, time, blocks];
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

				return resolve(['dijkstra', true, path, visitedNodes, time, blocks]);
			}

			let { neighbors } = closestNode;

			for (let i = 0; i < neighbors.length; i += 1) {
				if (neighbors[i].visited === false && !neighbors[i].block) {
					neighbors[i].visited = true;
					neighbors[i].distance = closestNode.distance + 1;
					neighbors[i].previousNode = closestNode;
				}
			}
		}

		return resolve(['dijkstra', false, path, visitedNodes, time, blocks]);
	});
}
