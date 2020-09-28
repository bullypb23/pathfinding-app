import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const StyledNode = styled.div`
	width: 30px;
	height: 30px;
	border: 1px solid #34495E;
	transition: all 0.3s;
	${props => props.isBlock === true && 'background-color: #34495E'};
	${props => props.isVisited === true && 'background-color: #40CEE3; transition: all 1s;'};
	${props => props.isStart === true && 'background-color: green'};
	${props => props.isEnd === true && 'background-color: red'};
	${props => props.isInShortestPath === true && 'background-color: #FFFE6A;  transition: all 1s;'};

	@media (max-width: 576px) {
		width: 20px;
		height: 20px;
	}
`;
