/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Node from './Node';
import * as actions from '../store/actions/game';
import astarAlgorithm from '../algorithms/astar';
import bfsAlgorithm from '../algorithms/bfs';
import dijkstraAlgorithm from '../algorithms/dijkstra';

const Wrapper = styled.div`
	width: 100%;
`;

const Container = styled.div`
width: 100%;
padding: 10px 0;
`;

const Section = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
`;

const AlgorithmsContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
`;

const Checkbox = styled.input`
	margin-right: 10px;
`;

const Label = styled.label`
	font-size: 1.2rem;
  padding: 10px 0;
`;

const Heading = styled.h3`
  font-size: 2rem;
  padding: 10px 0;
	color: #34495E;
`;

const ErrorParagraph = styled.p`
	padding: 10px 0 0;
	font-size: 1.2rem;
	color: red;
`;

const MapContainer = styled.div`
	width: 100%;
	padding: 20px 0;
`;

const Row = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
	justify-content: center;
`;

const ButtonContainer = styled.div`
	width: 100%;
	padding: 20px 0;
	display: flex;
	justify-content: center;
`;

const Button = styled.button`
	color: white;
  background-color: #1ABC9C;
  padding: 10px 20px;
	margin: 10px;
  border: none;
	outline: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #28E1BD;
  }

	&:disabled {
		background-color: #AAAAAA;
	}
`;

const Game = ({
	grid, rows, cols, startX, startY, endX, endY, toggleAlgorithm, astar, bfs, dijkstra, addResult, level, nextLevelHandler, levels, addBlocks, blocks, maxLevel,
}) => {
	const [error, setError] = useState(false);
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
			}
		}

		if (bfs) {
			const [success, path, visitedNodes, time] = bfsAlgorithm(rows, cols, startX, startY, endX, endY, blocksArr);
			if (success) {
				addResult({
					name: 'bfs', path, visitedNodes, time,
				});
			}
		}

		if (dijkstra) {
			const [success, path, visitedNodes, time] = dijkstraAlgorithm(rows, cols, startX, startY, endX, endY, blocksArr);
			if (success) {
				addResult({
					name: 'dijkstra', path, visitedNodes, time,
				});
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
				<Heading>Select algorithms you want to use</Heading>
				<Heading>
					Level:
					{' '}
					{level}
				</Heading>
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
			<MapContainer>
				{grid.map((row, rowIndex) => (
					<Row key={rowIndex}>
						{row.map((node, nodeIndex) => (
							<Node
								key={nodeIndex}
								row={rowIndex}
								col={nodeIndex}
								isStart={+rowIndex === +startY && +nodeIndex === +startX}
								isEnd={+rowIndex === +endY && +nodeIndex === +endX}
								isBlock={isNodeBlock(node)}
							/>
						))}
					</Row>
				))}
			</MapContainer>
			<ButtonContainer>
				<Button onClick={runAlgotithms} disabled={disabled}>Play</Button>
				<Button onClick={handleNextLevel}>Next Level</Button>
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
	levels: propTypes.object.isRequired,
	blocks: propTypes.object.isRequired,
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
	}
);

const mapDispatchToProps = dispatch => (
	{
		toggleAlgorithm: algorithm => dispatch(actions.toggleAlgorithm(algorithm)),
		addResult: algorithmData => dispatch(actions.addResult(algorithmData)),
		nextLevelHandler: () => dispatch(actions.nextLevelHandler()),
		addBlocks: block => dispatch(actions.addBlocks(block)),
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
