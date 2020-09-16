/* eslint-disable no-loop-func */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Node from './Node';

const Wrapper = styled.div`
	width: 100%;
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

const SmallHeading = styled.h5`
	font-size: 1.3rem;
	color: #34495E;
	font-weight: bold;
	padding-bottom: 10px;
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
`;

const Replay = ({
	grid, replay, startX, startY, endX, endY, level, maxLevel, blocks,
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
		if (level > 1 && level <= maxLevel) {
			for (let i = 0; i < blocks[level][0].length; i += 1) {
				if (blocks[level][0][i][0] === node[0] && blocks[level][0][i][1] === node[1]) {
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

	if (!replay) {
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

	const animateAlgorithm = () => {
		setNodesArray([]);
		setShortestPath([]);

		const shortestPathReverse = replay.data.path.reverse();

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
								isVisited={isVisitedNode(node)}
								isInShortestPath={isInShortestPath(node)}
							/>
						))}
					</Row>
				))}
			</MapContainer>
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
	level: propTypes.number.isRequired,
	maxLevel: propTypes.number.isRequired,
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
