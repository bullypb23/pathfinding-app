import React from 'react';
import propTypes from 'prop-types';
import Sketch from 'react-p5';
import { connect } from 'react-redux';

const startX = 0; const startY = 4; const endX = 9; const
	endY = 24;

const cols = 25; const
	rows = 25;
// var grid = new Array(cols);
let openSet = []; const
	closedSet = [];
let start; let
	end;
// let w; let
// 	h;
const path = [];
const level = 0;
let startTime; let
	endTime;
const blocks = [];

const Grid = ({ grid }) => {
	function heuristic(p5, a, b) {
		// var d = p5.dist(a.i, b.i, a.j, b.j);
		const d = p5.abs(a.i - b.i) + p5.abs(a.j - b.j);
		return d;
	}

	// function Spot(i, j) {
	// 	this.i = i;
	// 	this.j = j;
	// 	this.f = 0;
	// 	this.g = 0;
	// 	this.h = 0;
	// 	this.neighbors = [];
	// 	this.previous = undefined;
	// 	this.block = false;

	// 	this.show = function (p5, col) {
	// 		p5.fill(col);
	// 		if (this.block) {
	// 			p5.fill(0);
	// 		}
	// 		p5.rect(this.i * w, this.j * h, w, h);
	// 	};

	// 	this.addNeighbors = function (grid) {
	// 		const { i } = this;
	// 		const { j } = this;

	// 		if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
	// 		if (i > 0) this.neighbors.push(grid[i - 1][j]);
	// 		if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
	// 		if (j > 0) this.neighbors.push(grid[i][j - 1]);
	// 	};
	// }

	function randomNumber() {
		return Math.floor(Math.random() * (cols - 1) + 1);
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

	function makeGrid() {
		// making 2D array
		for (let i = 0; i < cols; i += 1) {
			grid[i] = new Array(rows);
		}

		// for (let i = 0; i < cols; i += 1) {
		// 	for (let j = 0; j < rows; j += 1) {
		// 		grid[i][j] = new Spot(i, j);
		// 	}
		// }

		for (let i = 0; i < cols; i += 1) {
			for (let j = 0; j < rows; j += 1) {
				grid[i][j].addNeighbors(grid);
			}
		}

		start = grid[startX][startY];
		end = grid[endX][endY];

		if (level > 0) {
			for (let i = 0; i < level; i += 1) {
				const block = randomBlocks(grid);
				block.block = true;
				blocks.push(block);
			}
		}

		start.block = false;
		end.block = false;
	}

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		p5.createCanvas(400, 400).parent(canvasParentRef);
		startTime = Date.now();

		// w = p5.width / cols;
		// h = p5.height / rows;

		makeGrid();

		openSet.push(start);
	};

	const draw = (p5) => {
		if (openSet.length > 0) {
			let lowestIndex = 0;
			for (let i = 0; i < openSet.length; i += 1) {
				if (openSet[i].f < openSet[lowestIndex].f) {
					lowestIndex = i;
				}
			}

			const current = openSet[lowestIndex];

			if (current === end) {
				console.log(closedSet.length);
				endTime = Date.now();
				console.log((endTime - startTime) / 1000);
				let temp = current;
				path.push(temp);
				while (temp.previous) {
					path.push(temp.previous);
					temp = temp.previous;
				}
				p5.noLoop();
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
						neighbor.h = heuristic(p5, neighbor, end);
						neighbor.f = neighbor.g + neighbor.h;
						neighbor.previous = current;
					}
				}
			}
		} else {
			console.log('no solution!');
			p5.noLoop();
			return;
		}
		p5.background(0);

		for (let i = 0; i < cols; i += 1) {
			for (let j = 0; j < rows; j += 1) {
				grid[i][j].show(p5, p5.color(255));
			}
		}

		for (let i = 0; i < closedSet.length; i += 1) {
			closedSet[i].show(p5, p5.color(255, 0, 0));
		}

		for (let i = 0; i < openSet.length; i += 1) {
			openSet[i].show(p5, p5.color(0, 255, 0));
		}

		start.show(p5, p5.color(0, 0, 255));
		end.show(p5, p5.color(0, 0, 255));

		for (let i = 0; i < path.length; i += 1) {
			path[i].show(p5, p5.color(0, 0, 255));
		}
	};

	return (
		<div>
			<Sketch setup={setup} draw={draw} />
		</div>
	);
};

Grid.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	grid: propTypes.array.isRequired,
};

const mapStateToProps = state => ({
	start: state.start,
	end: state.end,
	grid: state.grid,
});

export default connect(mapStateToProps)(Grid);
