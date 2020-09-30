/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import MapComponent from './MapComponent';
import * as actions from '../store/actions/game';
import astarAlgorithm from '../algorithms/astar';
import bfsAlgorithm from '../algorithms/bfs';
import dijkstraAlgorithm from '../algorithms/dijkstra';
import {
	Wrapper, Container, Heading, ErrorParagraph, Button, ButtonContainer,
} from './Game.styles';

const Game = ({
	grid, gridSize, start, end, algorithms, makeGrid, handleMaxLevel,
	addResult, level, nextLevelHandler, levels, addBlocks, blocks, maxLevel,
	handleNoResult, gameFinished, setAutomatic, automatic, gameStarted,
}) => {
	const [shortestPath, setShortestPath] = useState([]);
	useEffect(() => {
		if (automatic && gameStarted && !gameFinished) {
			// eslint-disable-next-line no-use-before-define
			runAlgotithms();
			// eslint-disable-next-line no-use-before-define
			handleNextLevel();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [automatic, level, gameFinished]);

	const useQuery = () => new URLSearchParams(useLocation().search);

	const query = useQuery();

	useEffect(() => {
		if (!gameStarted) {
			return;
		}

		const cols = query.get('cols');
		const rows = query.get('rows');

		const newGrid = new Array(rows);
		for (let i = 0; i < rows; i += 1) {
			newGrid[i] = new Array(cols);
		}

		for (let i = 0; i < gridSize.rows; i += 1) {
			for (let j = 0; j < gridSize.cols; j += 1) {
				newGrid[i][j] = [i, j];
			}
		}
		makeGrid(newGrid);
		handleMaxLevel(cols, rows);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let blocksArr = [];

	if (level > 1) {
		// eslint-disable-next-line prefer-destructuring
		blocksArr = blocks[level][0];
	}

	const randomNumber = num => Math.floor(Math.random() * num);

	const animateShortestPath = (nodesInShortestPathOrder) => {
		for (let i = 0; i < nodesInShortestPathOrder.length; i += 1) {
			setTimeout(() => {
				const node = nodesInShortestPathOrder[i];
				setShortestPath(oldArray => [...oldArray, node]);
			}, i * 50);
		}
	};

	const isInShortestPath = (node) => {
		if (shortestPath.length !== 0) {
			for (let i = 0; i < shortestPath.length; i += 1) {
				if (shortestPath[i].j === node[0] && shortestPath[i].i === node[1]) {
					return true;
				}
			}
		}
		return false;
	};

	const algorithmsObj = {
		astar: astarAlgorithm,
		bfs: bfsAlgorithm,
		dijkstra: dijkstraAlgorithm,
	};

	const getAlgorithmFunctions = allowed => Object.keys(algorithmsObj)
		.filter(key => allowed.includes(key))
		.reduce((obj, key) => {
			obj[key] = algorithmsObj[key];
			return obj;
		}, []);

	async function runAlgotithms() {
		const selectedAlgoritms = Object.entries(algorithms).filter(arr => arr[1]).map(arr => arr[0]);
		const algorithmsToRun = getAlgorithmFunctions(selectedAlgoritms);

		// eslint-disable-next-line no-console
		const fastestAlgorithm = await Promise.race(Object.keys(algorithmsToRun)
			.map(key => algorithmsToRun[key](gridSize, start, end, blocksArr)));
			// .then(value => animateShortestPath(value[2].reverse()));

		if (fastestAlgorithm[1] === true) {
			animateShortestPath(fastestAlgorithm[2].reverse());
		} else {
			handleNoResult();
			return;
		}

		const responses = await Promise.all(Object.keys(algorithmsToRun)
			.map(key => algorithmsToRun[key](gridSize, start, end, blocksArr)));

		// eslint-disable-next-line array-callback-return
		responses.map((response) => {
			const [name, success, path, visitedNodes, time] = response;
			console.log(response);
			if (success) {
				addResult({
					name,
					path,
					visitedNodes,
					time,
				});
			}
		});
		// .then((result) => {
		// 	// eslint-disable-next-line array-callback-return
		// 	result.map((res) => {
		// 		const [name, success, path, visitedNodes, time] = res;
		// 		if (success) {
		// 			addResult({
		// 				name,
		// 				path,
		// 				visitedNodes,
		// 				time,
		// 			});
		// 		} else {
		// 			handleNoResult();
		// 			// eslint-disable-next-line no-useless-return
		// 			return;
		// 		}
		// 	});
		// });
		// Object.keys(algorithmsToRun).forEach((key) => {
		// 	const algorithm = algorithmsToRun[key];
		// 	const [success, path, visitedNodes, time] = algorithm(
		// 		gridSize.rows,
		// 		gridSize.cols,
		// 		start.x,
		// 		start.y,
		// 		end.x,
		// 		end.y,
		// 		blocksArr
		// 	);
		// 	if (success) {
		// 		addResult({
		// 			name: key,
		// 			path,
		// 			visitedNodes,
		// 			time,
		// 		});
		// 	} else {
		// 		handleNoResult();
		// 	}
		// });
	}

	const randomBlocks = (board) => {
		const x = randomNumber(gridSize.rows);
		const y = randomNumber(gridSize.cols);
		if ((x === start.y && y === start.x) || (x === end.y && y === end.x)) {
			return randomBlocks(board);
		}
		return board[x][y];
	};

	const handleBlocks = (arr) => {
		const block = randomBlocks(grid);
		if (!arr.includes(block)) {
			arr.push(block);
			return arr;
		}
		return handleBlocks(arr);
	};

	const handleNextLevel = () => {
		setShortestPath([]);
		if (level < maxLevel) {
			nextLevelHandler();
			let blocksArray = [];

			if (level > 0) {
				for (let i = 0; i < level; i += 1) {
					blocksArray = handleBlocks(blocksArray);
				}
				addBlocks(blocksArray);
			}
		}
	};

	const handleAutomatic = () => {
		setAutomatic();
	};

	if (!gameStarted) {
		return <Redirect to="/" />;
	}

	let disabled = false;
	if (levels[level]) {
		disabled = true;
	}

	const isNodeBlock = (node) => {
		if (level > 1 && level <= maxLevel) {
			for (let i = 0; i < blocks[level][0].length; i += 1) {
				if (blocks[level][0][i][0] === node[0] && blocks[level][0][i][1] === node[1]) {
					return true;
				}
			}
		}
		return false;
	};

	return (
		<Wrapper>
			<Container>
				<Heading>
					Level:
					{' '}
					{level}
				</Heading>
			</Container>
			<MapComponent
				grid={grid}
				start={start}
				end={end}
				isNodeBlock={isNodeBlock}
				isInShortestPath={isInShortestPath}
			/>
			{gameFinished ? <ErrorParagraph>There is no path available, end of game!</ErrorParagraph> : null}
			<ButtonContainer>
				<Button onClick={runAlgotithms} disabled={disabled || gameFinished}>Play</Button>
				<Button onClick={handleNextLevel} disabled={gameFinished}>Next Level</Button>
				<Button onClick={handleAutomatic} disabled={gameFinished}>Automatic Play</Button>
			</ButtonContainer>
		</Wrapper>
	);
};

Game.propTypes = {
	grid: propTypes.array.isRequired,
	gridSize: propTypes.object.isRequired,
	start: propTypes.object.isRequired,
	end: propTypes.object.isRequired,
	level: propTypes.number.isRequired,
	maxLevel: propTypes.number.isRequired,
	algorithms: propTypes.object.isRequired,
	makeGrid: propTypes.func.isRequired,
	handleMaxLevel: propTypes.func.isRequired,
	addResult: propTypes.func.isRequired,
	addBlocks: propTypes.func.isRequired,
	nextLevelHandler: propTypes.func.isRequired,
	handleNoResult: propTypes.func.isRequired,
	setAutomatic: propTypes.func.isRequired,
	levels: propTypes.object.isRequired,
	blocks: propTypes.object.isRequired,
	gameFinished: propTypes.bool.isRequired,
	gameStarted: propTypes.bool.isRequired,
	automatic: propTypes.bool.isRequired,
};

const mapStateToProps = state => (
	{
		grid: state.game.grid,
		gridSize: state.gameConfig.gridSize,
		start: state.gameConfig.start,
		end: state.gameConfig.end,
		algorithms: state.gameConfig.algorithms,
		level: state.game.level,
		levels: state.game.levels,
		blocks: state.game.blocks,
		maxLevel: state.game.maxLevel,
		gameFinished: state.game.gameFinished,
		gameStarted: state.game.gameStarted,
		automatic: state.game.automatic,
	}
);

const mapDispatchToProps = dispatch => (
	{
		addResult: algorithmData => dispatch(actions.addResult(algorithmData)),
		handleNoResult: () => dispatch(actions.handleNoResult()),
		nextLevelHandler: () => dispatch(actions.nextLevelHandler()),
		addBlocks: block => dispatch(actions.addBlocks(block)),
		setAutomatic: () => dispatch(actions.setAutomatic()),
		makeGrid: grid => dispatch(actions.makeGrid(grid)),
		handleMaxLevel: (num1, num2) => dispatch(actions.handleMaxLevel(num1, num2)),
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
