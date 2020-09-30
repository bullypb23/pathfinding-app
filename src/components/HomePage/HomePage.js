/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Wrapper, InformationDiv, Heading, LinkContainer, StyledButton, Container, Paragraph,
	SizeButton, SizeButtonRight, SizeContainer, Size, ErrorParagraph, Span,
} from './HomePage.styles';
import Algorithms from '../Algorithms/Algorithms';
import * as gameConfigActions from '../../store/actions/gameConfig';
import * as gameActions from '../../store/actions/game';
import algorithmName from '../../shared/common';

const HomePage = ({
	history, start, end, gridSize, setGrid,
	setStart, setEnd, startGame, gameStarted,
	gameResetHandler, gameConfigResetHandler, algorithms,
}) => {
	const [equal, setEqual] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const selectedAlgoritms = Object.values(algorithms).filter(Boolean);
		if (selectedAlgoritms.length === 0) {
			setError(true);
		} else {
			setError(false);
		}
	}, [algorithms]);

	useEffect(() => {
		if (gridSize.cols === 0) {
			setGrid(10, 0);
		}

		if (gridSize.rows === 0) {
			setGrid(0, 10);
		}

		if (start.x < 0) {
			setStart(gridSize.cols, 0);
		} else if (start.x > gridSize.cols - 1) {
			setStart(-gridSize.cols, 0);
		}

		if (start.y < 0) {
			setStart(0, gridSize.rows);
		} else if (start.y > gridSize.rows - 1) {
			setStart(0, -gridSize.rows);
		}

		if (end.x < 0) {
			setEnd(gridSize.cols, 0);
		} else if (end.x > gridSize.cols - 1) {
			setEnd(-gridSize.cols, 0);
		}

		if (end.y < 0) {
			setEnd(0, gridSize.rows);
		} else if (end.y > gridSize.rows - 1) {
			setEnd(0, -gridSize.rows);
		}

		if (start.x === end.x && start.y === end.y) {
			setEqual(true);
		} else {
			setEqual(false);
		}
	}, [gridSize, end, start]);

	const goToGamePage = () => {
		startGame();
		// eslint-disable-next-line react/prop-types
		history.push(`/game?cols=${gridSize.cols}&rows=${gridSize.rows}`);
	};

	const handleReset = () => {
		gameResetHandler();
		gameConfigResetHandler();
	};

	return (
		<Wrapper>
			<Heading>Pathfinding application</Heading>
			<Paragraph>
				Selected algorithms are:
				{' '}
				{Object.entries(algorithms).filter(arr => arr[1]).map(arr => (
					<Span key={arr[0]}>
						{algorithmName(arr[0])}
						,
						{' '}
					</Span>
				))}
			</Paragraph>
			<Algorithms />
			{error ? <ErrorParagraph>Please select one pathfinding algorithm</ErrorParagraph> : null}
			<InformationDiv>
				<Container>
					<Paragraph>
						Grid size is:
						{' '}
						{gridSize.cols}
						{' '}
						columns and
						{' '}
						{gridSize.rows}
						{' '}
						rows
					</Paragraph>
					<SizeContainer>
						<Paragraph>Columns: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => setGrid(-1, 0)}>-</SizeButton>
						<Size>{gridSize.cols}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => setGrid(1, 0)}>+</SizeButtonRight>
					</SizeContainer>
					<SizeContainer>
						<Paragraph>Rows: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => setGrid(0, -1)}>-</SizeButton>
						<Size>{gridSize.rows}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => setGrid(0, 1)}>+</SizeButtonRight>
					</SizeContainer>
				</Container>
				<Container>
					<Paragraph>
						Start coordinates are x =
						{' '}
						{start.x}
						{' '}
						and y =
						{' '}
						{start.y}
					</Paragraph>
					<SizeContainer>
						<Paragraph>X: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => setStart(-1, 0)}>-</SizeButton>
						<Size>{start.x}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => setStart(1, 0)}>+</SizeButtonRight>
					</SizeContainer>
					<SizeContainer>
						<Paragraph>Y: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => setStart(0, -1)}>-</SizeButton>
						<Size>{start.y}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => setStart(0, 1)}>+</SizeButtonRight>
					</SizeContainer>
				</Container>
				<Container>
					<Paragraph>
						End coordinates are x =
						{' '}
						{end.x}
						{' '}
						and y =
						{' '}
						{end.y}
					</Paragraph>
					<SizeContainer>
						<Paragraph>X: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => setEnd(-1, 0)}>-</SizeButton>
						<Size>{end.x}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => setEnd(1, 0)}>+</SizeButtonRight>
					</SizeContainer>
					<SizeContainer>
						<Paragraph>Y: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => setEnd(0, -1)}>-</SizeButton>
						<Size>{end.y}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => setEnd(0, 1)}>+</SizeButtonRight>
					</SizeContainer>
				</Container>
			</InformationDiv>
			<LinkContainer>
				<StyledButton disabled={equal || error} onClick={goToGamePage}>Play/Run</StyledButton>
				<StyledButton onClick={handleReset}>Reset</StyledButton>
			</LinkContainer>
			{equal ? <ErrorParagraph>Start and end are equal, please change one!</ErrorParagraph> : null}
		</Wrapper>
	);
};

const mapStateToProps = state => ({
	start: state.gameConfig.start,
	end: state.gameConfig.end,
	gridSize: state.gameConfig.gridSize,
	gameStarted: state.game.gameStarted,
	algorithms: state.gameConfig.algorithms,
});

const mapDispatchToProps = dispatch => (
	{
		setGrid: (x, y) => dispatch(gameConfigActions.setGrid(x, y)),
		setStart: (x, y) => dispatch(gameConfigActions.setStart(x, y)),
		setEnd: (x, y) => dispatch(gameConfigActions.setEnd(x, y)),
		startGame: () => dispatch(gameActions.startGame()),
		gameResetHandler: () => dispatch(gameActions.gameResetHandler()),
		gameConfigResetHandler: () => dispatch(gameConfigActions.gameConfigResetHandler()),
	}
);

HomePage.propTypes = {
	gridSize: propTypes.object.isRequired,
	start: propTypes.object.isRequired,
	end: propTypes.object.isRequired,
	algorithms: propTypes.object.isRequired,
	setGrid: propTypes.func.isRequired,
	setStart: propTypes.func.isRequired,
	setEnd: propTypes.func.isRequired,
	startGame: propTypes.func.isRequired,
	gameStarted: propTypes.bool.isRequired,
	gameResetHandler: propTypes.func.isRequired,
	gameConfigResetHandler: propTypes.func.isRequired,
	history: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
