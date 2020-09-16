import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const StyledNode = styled.div`
	width: 30px;
	height: 30px;
	border: 1px solid #34495E;
	transition: all 0.3s;
	${props => props.isBlock === true && 'background-color: #34495E'};
	${props => (props.isVisited === true && 'background-color: #40CEE3; transition: all 1s;')};
	${props => props.isStart === true && 'background-color: green'};
	${props => props.isEnd === true && 'background-color: red'};
	${props => props.isInShortestPath === true && 'background-color: #FFFE6A;  transition: all 1s;'};
`;

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
