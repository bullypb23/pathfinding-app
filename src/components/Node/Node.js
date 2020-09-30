import React from 'react';
import propTypes from 'prop-types';
import { StyledNode } from './Node.styles';

const Node = ({
	isStart, isEnd, isBlock, isInShortestPath,
}) => (
	<StyledNode isStart={isStart} isEnd={isEnd} isBlock={isBlock} isInShortestPath={isInShortestPath} />
);

Node.propTypes = {
	isStart: propTypes.bool.isRequired,
	isEnd: propTypes.bool.isRequired,
	isBlock: propTypes.bool.isRequired,
	isInShortestPath: propTypes.bool,
};

Node.defaultProps = {
	isInShortestPath: false,
};

export default Node;
