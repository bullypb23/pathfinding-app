import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const StyledNode = styled.div`
	width: 30px;
	height: 30px;
	border: 1px solid #34495E;
	${props => props.isStart === true && 'background-color: #34495E'};
	${props => props.isEnd === true && 'background-color: red'};
`;

const Node = ({ isStart, isEnd }) => (
	<StyledNode isStart={isStart} isEnd={isEnd} />
);

Node.propTypes = {
	isStart: propTypes.bool.isRequired,
	isEnd: propTypes.bool.isRequired,
};

export default Node;
