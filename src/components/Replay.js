/* eslint-disable no-loop-func */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import MapComponent from './MapComponent';
import { Wrapper, SmallHeading, Button } from './Replay.styles';

const Replay = ({
	grid, replay, startX, startY, endX, endY, blocks,
}) => {
	const [nodesArray, setNodesArray] = useState([]);
	const [shortestPath, setShortestPath] = useState([]);

	const algorithmName = (al) => {
		let alName;
		if (al === 'astar') {
			alName = 'A* algorithm';
		} else if (al === 'bfs') {
			alName = 'Breadth-first Search';
		} else if (al === 'dijkstra') {
			alName = 'Dijkstra';
		}
		return alName;
	};

	const isNodeBlock = (node) => {
		if (blocks[replay.level]) {
			for (let i = 0; i < blocks[replay.level][0].length; i += 1) {
				if (blocks[replay.level][0][i][0] === node[0] && blocks[replay.level][0][i][1] === node[1]) {
					return true;
				}
			}
		}
		return false;
	};

	const isVisitedNode = (node) => {
		if (nodesArray.length !== 0) {
			for (let i = 0; i < nodesArray.length; i += 1) {
				if (nodesArray[i].j === node[0] && nodesArray[i].i === node[1]) {
					return true;
				}
			}
		}
		return false;
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

	if (Object.keys(replay).length === 0) {
		return <Redirect to="/" />;
	}

	const animateShortestPath = (nodesInShortestPathOrder) => {
		for (let i = 0; i < nodesInShortestPathOrder.length; i += 1) {
			setTimeout(() => {
				const node = nodesInShortestPathOrder[i];
				setShortestPath(oldArray => [...oldArray, node]);
			}, i * 50);
		}
	};

	const reverseArray = arr => arr.reverse();

	const animateAlgorithm = () => {
		setNodesArray([]);
		setShortestPath([]);

		const shortestPathReverse = reverseArray(replay.data.path);

		const visitedNodesInOrder = replay.data.visitedNodes;

		for (let i = 0; i <= visitedNodesInOrder.length; i += 1) {
			if (i === visitedNodesInOrder.length) {
				setTimeout(() => {
					animateShortestPath(shortestPathReverse);
				}, i * 50);
				return;
			}
			setTimeout(() => {
				const node = visitedNodesInOrder[i];
				setNodesArray(oldArray => [...oldArray, node]);
			}, i * 50);
		}
	};

	return (
		<Wrapper>
			<SmallHeading>
				Level
				{' '}
				{replay.level}
				{' '}
				-
				{' '}
				{algorithmName(replay.name)}
			</SmallHeading>
			<MapComponent
				grid={grid}
				startX={startX}
				startY={startY}
				endX={endX}
				endY={endY}
				isNodeBlock={isNodeBlock}
				isVisitedNode={isVisitedNode}
				isInShortestPath={isInShortestPath}
			/>
			<Button onClick={animateAlgorithm}>Replay</Button>
		</Wrapper>
	);
};

Replay.propTypes = {
	grid: propTypes.array.isRequired,
	startX: propTypes.number.isRequired,
	startY: propTypes.number.isRequired,
	endX: propTypes.number.isRequired,
	endY: propTypes.number.isRequired,
	replay: propTypes.object.isRequired,
	blocks: propTypes.object.isRequired,
};

const mapStateToProps = state => (
	{
		replay: state.game.replay,
		level: state.game.level,
		blocks: state.game.blocks,
		maxLevel: state.game.maxLevel,
		grid: state.gameConfig.grid,
		startX: state.gameConfig.startX,
		startY: state.gameConfig.startY,
		endX: state.gameConfig.endX,
		endY: state.gameConfig.endY,
	}
);

export default connect(mapStateToProps)(Replay);
