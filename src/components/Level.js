/* eslint-disable react/forbid-prop-types */
import React from 'react';
import propTypes from 'prop-types';
import {
	Wrapper, LevelNumber, Heading, AlgorithmContainer, Algorithm, SmallHeading, Paragraph, Button,
} from './Level.styles';

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
