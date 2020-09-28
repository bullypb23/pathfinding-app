import React from 'react';
import propTypes from 'prop-types';
import { StyledNode } from './Node.styles';

const Node = ({
	isStart, isEnd, isBlock, isVisited, isInShortestPath,
}) => (
	<StyledNode isStart={isStart} isEnd={isEnd} isBlock={isBlock} isVisited={isVisited} isInShortestPath={isInShortestPath} />
);

Node.propTypes = {
	isStart: propTypes.bool.isRequired,
	isEnd: propTypes.bool.isRequired,
	isBlock: propTypes.bool.isRequired,
	isVisited: propTypes.bool,
	isInShortestPath: propTypes.bool,
};

Node.defaultProps = {
	isVisited: false,
	isInShortestPath: false,
};

export default Node;
