/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import propTypes from 'prop-types';
import Node from '../Node/Node';
import { MapContainer, Row } from './MapComponent.styles';

const MapComponent = ({
	grid, start, end, isNodeBlock, isInShortestPath,
}) => (
	<MapContainer>
		{grid.map((row, rowIndex) => (
			<Row key={rowIndex}>
				{row.map((node, nodeIndex) => (
					<Node
						key={nodeIndex}
						row={rowIndex}
						col={nodeIndex}
						isStart={+rowIndex === +start.y && +nodeIndex === +start.x}
						isEnd={+rowIndex === +end.y && +nodeIndex === +end.x}
						isBlock={isNodeBlock(node)}
						isInShortestPath={isInShortestPath(node)}
					/>
				))}
			</Row>
		))}
	</MapContainer>
);

MapComponent.propTypes = {
	grid: propTypes.array.isRequired,
	start: propTypes.object.isRequired,
	end: propTypes.object.isRequired,
	isNodeBlock: propTypes.func.isRequired,
	isInShortestPath: propTypes.func,
};

MapComponent.defaultProps = {
	isInShortestPath: () => {

	},
};

export default MapComponent;
