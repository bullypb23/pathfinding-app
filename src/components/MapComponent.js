/* eslint-disable react/no-array-index-key */
import React from 'react';
import propTypes from 'prop-types';
import Node from './Node';
import { MapContainer, Row } from './MapComponent.styles';

const MapComponent = ({
	grid, startX, startY, endX, endY, isNodeBlock, isVisitedNode, isInShortestPath,
}) => (
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
);

MapComponent.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	grid: propTypes.array.isRequired,
	startX: propTypes.number.isRequired,
	startY: propTypes.number.isRequired,
	endX: propTypes.number.isRequired,
	endY: propTypes.number.isRequired,
	isNodeBlock: propTypes.func.isRequired,
	isVisitedNode: propTypes.func,
	isInShortestPath: propTypes.func,
};

MapComponent.defaultProps = {
	isVisitedNode: () => {

	},
	isInShortestPath: () => {

	},
};

export default MapComponent;
