function heuristic(p5, a, b) {
	// var d = p5.dist(a.i, b.i, a.j, b.j);
	const d = p5.abs(a.i - b.i) + p5.abs(a.j - b.j);
	return d;
}

function randomNumber(num) {
	return Math.floor(Math.random() * (num - 1) + 1);
}

function randomBlocks(board) {
	const x = randomNumber();
	const y = randomNumber();
	if (!blocks.includes(board[x][y])) {
		if (board[x][y] !== start && board[x][y] !== end) {
			return board[x][y];
		}
		return randomBlocks(board);
	}
	return randomBlocks(board);
}

function Spot(i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.previous = undefined;
	this.block = false;

	this.show = function show(p5, col) {
		p5.fill(col);
		if (this.block) {
			p5.fill(0);
		}
		p5.rect(this.i * w, this.j * h, w, h);
	};

	this.addNeighbors = function addNeighbors(grid) {
		const { i } = this;
		const { j } = this;

		if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
		if (i > 0) this.neighbors.push(grid[i - 1][j]);
		if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
		if (j > 0) this.neighbors.push(grid[i][j - 1]);
	};
}

function astar() {

}