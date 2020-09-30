/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
const grid = [];

function Node(i, j) {
	this.i = i;
	this.j = j;
	this.edges = [];
	this.visited = false;
	this.parent = undefined;
	this.block = false;

	this.addEdges = function addEdges(board, rows, cols) {
		const { i } = this;
		const { j } = this;

		if (i < cols - 1) this.edges.push(board[i + 1][j]);
		if (i > 0) this.edges.push(board[i - 1][j]);
		if (j < rows - 1) this.edges.push(board[i][j + 1]);
		if (j > 0) this.edges.push(board[i][j - 1]);
	};
}

const setup = (cols, rows, blocks) => {
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
			grid[i][j].addEdges(grid, rows, cols);
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

export default function bfs(gridSize, startCoords, endCoords, blocks) {
	return new Promise((resolve) => {
		let startTime = Date.now();
		let endTime;
		let time;
		let start;
		let end;
		const queue = [];
		const visitedNodes = [];
		const path = [];

		setup(gridSize.cols, gridSize.rows, blocks);

		start = grid[startCoords.x][startCoords.y];
		end = grid[endCoords.x][endCoords.y];

		queue.push(start);

		while (queue.length > 0) {
			const current = queue.shift();
			current.visited = true;
			visitedNodes.push(current);

			if (current === end) {
				endTime = Date.now();
				time = Math.abs((endTime - startTime) / 1000);
				let temp = current;
				path.push(temp);
				while (temp.parent) {
					path.push(temp.parent);
					temp = temp.parent;
				}

				return resolve(['bfs', true, path, visitedNodes, time]);
			}

			const { edges } = current;

			for (let i = 0; i < edges.length; i += 1) {
				if (edges[i].visited === false && !edges[i].block) {
					edges[i].visited = true;
					edges[i].parent = current;
					queue.push(edges[i]);
				}
			}
		}
		endTime = Date.now();
		time = (endTime - startTime) / 1000;
		return resolve(['bfs', false, path, visitedNodes, time]);
	});
}
