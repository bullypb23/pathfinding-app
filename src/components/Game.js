/* eslint-disable react/no-array-index-key */
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Node from './Node';
import * as actions from '../store/actions/gameConfig';

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

const Paragraph = styled.p`
  font-size: 1.2rem;
  padding: 10px 0;
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
  border: none;
	outline: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #26BFA1;
  }
`;

const Game = ({
	grid, startX, startY, endX, endY,
}) => {
	const runAlgotithms = () => {

	};
	if (grid.length === 0) {
		return <Redirect to="/" />;
	}

	return (
		<Wrapper>
			<Container>
				<Paragraph>Select algorithms you want to use</Paragraph>
				<Section>
					<AlgorithmsContainer>
						<Checkbox type="checkbox" value="astar" id="astar" />
						<Label htmlFor="astar">A* Search</Label>
					</AlgorithmsContainer>
					<AlgorithmsContainer>
						<Checkbox type="checkbox" value="bfs" id="bfs" />
						<Label htmlFor="bfs">Breadth-first Search</Label>
					</AlgorithmsContainer>
					<AlgorithmsContainer>
						<Checkbox type="checkbox" value="dijkstra" id="dijkstra" />
						<Label htmlFor="dijkstra">Dijkstra</Label>
					</AlgorithmsContainer>
				</Section>
			</Container>
			{grid.map((row, rowIndex) => (
				<Row key={rowIndex}>
					{row.map((node, nodeIndex) => (
						<Node
							key={nodeIndex}
							row={rowIndex}
							col={nodeIndex}
							isStart={+rowIndex === startY && +nodeIndex === startX}
							isEnd={+rowIndex === endY && +nodeIndex === endX}
						/>
					))}
				</Row>
			))}
			<ButtonContainer>
				<Button onClick={runAlgotithms}>Play</Button>
			</ButtonContainer>
		</Wrapper>
	);
};

Game.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	grid: propTypes.array.isRequired,
	startX: propTypes.number.isRequired,
	startY: propTypes.number.isRequired,
	endX: propTypes.number.isRequired,
	endY: propTypes.number.isRequired,
};

const mapStateToProps = state => (
	{
		grid: state.gameConfig.grid,
		startX: state.gameConfig.startX,
		startY: state.gameConfig.startY,
		endX: state.gameConfig.endX,
		endY: state.gameConfig.endY,
	}
);

const mapDispatchToProps = dispatch => (
	{
		makeGrid: grid => dispatch(actions.makeGrid(grid)),
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
