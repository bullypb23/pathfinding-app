/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Wrapper = styled.div`
	flex-basis: 60%;
	display: flex;
	flex-wrap: wrap;
	margin: 10px;
`;

const LevelNumber = styled.div`
	flex: 1 1 100%;
	background-color: #CCCCCC;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	padding: 10px 0;
`;

const AlgorithmContainer = styled.div`
	flex: 1 1 100%;
	display: flex;
	border: 1px solid #CCCCCC;
`;

const Algorithm = styled.div`
	flex: 1 1 100%;
	padding: 10px;
`;

const Heading = styled.h3`
	font-size: 2rem;
	color: #34495E;
`;

const SmallHeading = styled.h5`
	font-size: 1.3rem;
	color: #34495E;
	font-weight: bold;
	padding-bottom: 5px;
`;

const Paragraph = styled.p`
	font-size: 1rem;
	color: #34495E;
	padding: 5px 0;
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

const Level = ({ algorithms, number, handleAlgorithmReplay }) => {
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

	return (
		<Wrapper>
			<LevelNumber>
				<Heading>
					Level
					{' '}
					{number}
				</Heading>
			</LevelNumber>
			<AlgorithmContainer>
				{Object.keys(algorithms).map((al) => {
					const name = algorithmName(al);
					return (
						<Algorithm key={al}>
							<SmallHeading>
								Algorithm:
								{' '}
								{name}
							</SmallHeading>
							<Paragraph>
								Number of visited nodes:
								{' '}
								{algorithms[al].visitedNodes.length}
							</Paragraph>
							<Paragraph>
								Time:
								{' '}
								{algorithms[al].time}
								s
							</Paragraph>
							<Button onClick={() => handleAlgorithmReplay(al, algorithms[al], number)}>Replay</Button>
						</Algorithm>
					);
				})}
			</AlgorithmContainer>
		</Wrapper>
	);
};

Level.propTypes = {
	number: propTypes.number.isRequired,
	algorithms: propTypes.object.isRequired,
	handleAlgorithmReplay: propTypes.func.isRequired,
};

export default Level;
