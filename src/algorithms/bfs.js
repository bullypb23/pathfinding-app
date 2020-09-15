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

// if (level > 0) {
// 	for (let i = 0; i < level; i++) {
// 		const x = randomNumber();
// 		const y = randomNumber();
// 		if (grid[x][y] !== start && grid[x][y] !== end) {
// 			grid[x][y].block = true;
// 			blocks.push(grid[x][y]);
// 		}
// 	}
// }

const setup = (cols, rows) => {
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
};

export default function bfs(rows, cols, startX, startY, endX, endY) {
	let startTime = Date.now();
	let endTime;
	let time;
	let start;
	let end;
	const queue = [];
	const visitedNodes = [];
	const path = [];

	setup(cols, rows);

	start = grid[startX][startY];
	end = grid[endX][endY];

	queue.push(start);

	while (queue.length > 0) {
		const current = queue.shift();
		current.visited = true;
		visitedNodes.push(current);

		if (current === end) {
			endTime = Date.now();
			time = (endTime - startTime) / 1000;
			let temp = current;
			path.push(temp);
			while (temp.parent) {
				path.push(temp.parent);
				temp = temp.parent;
			}

			return [true, path, visitedNodes, time];
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
	return [false, path, visitedNodes, time];
}
