/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MapComponent from './MapComponent';
import * as actions from '../store/actions/game';
import astarAlgorithm from '../algorithms/astar';
import bfsAlgorithm from '../algorithms/bfs';
import dijkstraAlgorithm from '../algorithms/dijkstra';
import {
	Wrapper, Container, Heading, Section, AlgorithmsContainer, Checkbox, Label, ErrorParagraph, Button, ButtonContainer,
} from './Game.styles';

const Game = ({
	grid, rows, cols, startX, startY, endX, endY, toggleAlgorithm, astar, bfs,
	dijkstra, addResult, level, nextLevelHandler, levels, addBlocks, blocks, maxLevel,
	handleNoResult, gameFinished, setAutomatic, automatic, gameStarted,
}) => {
	const [error, setError] = useState(false);

	useEffect(() => {
		if (automatic && gameStarted && !gameFinished) {
			// eslint-disable-next-line no-use-before-define
			runAlgotithms();
			// eslint-disable-next-line no-use-before-define
			handleNextLevel();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [automatic, level, gameFinished]);

	let blocksArr = [];

	if (level > 1) {
		// eslint-disable-next-line prefer-destructuring
		blocksArr = blocks[level][0];
	}

	const randomNumber = num => Math.floor(Math.random() * num);

	const runAlgotithms = () => {
		if (!astar && !bfs && !dijkstra) {
			setError(true);
		} else {
			setError(false);
		}

		if (astar) {
			const [success, path, visitedNodes, time] = astarAlgorithm(rows, cols, startX, startY, endX, endY, blocksArr);
			if (success) {
				addResult({
					name: 'astar', path, visitedNodes, time,
				});
			} else {
				handleNoResult();
				return;
			}
		}

		if (bfs) {
			const [success, path, visitedNodes, time] = bfsAlgorithm(rows, cols, startX, startY, endX, endY, blocksArr);
			if (success) {
				addResult({
					name: 'bfs', path, visitedNodes, time,
				});
			} else {
				handleNoResult();
				return;
			}
		}

		if (dijkstra) {
			const [success, path, visitedNodes, time] = dijkstraAlgorithm(rows, cols, startX, startY, endX, endY, blocksArr);
			if (success) {
				addResult({
					name: 'dijkstra', path, visitedNodes, time,
				});
			} else {
				handleNoResult();
			}
		}
	};

	const randomBlocks = (board) => {
		const x = randomNumber(rows);
		const y = randomNumber(cols);
		if ((x === startY && y === startX) || (x === endY && y === endX)) {
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

	if (grid.length === 0) {
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
				<Heading>Select algorithms you want to use</Heading>
				<Section>
					<AlgorithmsContainer>
						<Checkbox checked={astar} type="checkbox" value="astar" id="astar" onChange={e => toggleAlgorithm(e.target.value)} />
						<Label htmlFor="astar">A* Search</Label>
					</AlgorithmsContainer>
					<AlgorithmsContainer>
						<Checkbox checked={bfs} type="checkbox" value="bfs" id="bfs" onChange={e => toggleAlgorithm(e.target.value)} />
						<Label htmlFor="bfs">Breadth-first Search</Label>
					</AlgorithmsContainer>
					<AlgorithmsContainer>
						<Checkbox checked={dijkstra} type="checkbox" value="dijkstra" id="dijkstra" onChange={e => toggleAlgorithm(e.target.value)} />
						<Label htmlFor="dijkstra">Dijkstra</Label>
					</AlgorithmsContainer>
				</Section>
				{error ? <ErrorParagraph>Please select one pathfinding algorithm</ErrorParagraph> : null}
			</Container>
			<MapComponent
				grid={grid}
				startX={startX}
				startY={startY}
				endX={endX}
				endY={endY}
				isNodeBlock={isNodeBlock}
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
	rows: propTypes.number.isRequired,
	cols: propTypes.number.isRequired,
	startX: propTypes.number.isRequired,
	startY: propTypes.number.isRequired,
	endX: propTypes.number.isRequired,
	endY: propTypes.number.isRequired,
	level: propTypes.number.isRequired,
	maxLevel: propTypes.number.isRequired,
	toggleAlgorithm: propTypes.func.isRequired,
	astar: propTypes.bool.isRequired,
	bfs: propTypes.bool.isRequired,
	dijkstra: propTypes.bool.isRequired,
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
		grid: state.gameConfig.grid,
		rows: state.gameConfig.rows,
		cols: state.gameConfig.cols,
		startX: state.gameConfig.startX,
		startY: state.gameConfig.startY,
		endX: state.gameConfig.endX,
		endY: state.gameConfig.endY,
		astar: state.game.astar,
		bfs: state.game.bfs,
		dijkstra: state.game.dijkstra,
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
		toggleAlgorithm: algorithm => dispatch(actions.toggleAlgorithm(algorithm)),
		addResult: algorithmData => dispatch(actions.addResult(algorithmData)),
		nextLevelHandler: () => dispatch(actions.nextLevelHandler()),
		addBlocks: block => dispatch(actions.addBlocks(block)),
		handleNoResult: () => dispatch(actions.handleNoResult()),
		setAutomatic: () => dispatch(actions.setAutomatic()),
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
