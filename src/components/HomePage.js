import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Wrapper, InformationDiv, Heading, LinkContainer, StyledButton, Container, Paragraph, SizeButton, SizeButtonRight, SizeContainer, Size, ErrorParagraph,
} from './HomePage.styles';
import * as gameConfigActions from '../store/actions/gameConfig';
import * as gameActions from '../store/actions/game';

const HomePage = ({
	history, startX, startY, endX, endY, cols, rows, changeColumnSize, changeRowSize,
	changeStartX, changeStartY, changeEndX, changeEndY, makeGrid, handleMaxLevel, startGame, gameStarted,
	gameResetHandler, gameConfigResetHandler,
}) => {
	const [equal, setEqual] = useState(false);

	useEffect(() => {
		if (cols === 0) {
			changeColumnSize(10);
		}

		if (rows === 0) {
			changeRowSize(10);
		}

		if (startX < 0) {
			changeStartX(cols);
		} else if (startX > cols - 1) {
			changeStartX(-cols);
		}

		if (startY < 0) {
			changeStartY(rows);
		} else if (startY > rows - 1) {
			changeStartY(-rows);
		}

		if (endX < 0) {
			changeEndX(cols);
		} else if (endX > cols - 1) {
			changeEndX(-cols);
		}

		if (endY < 0) {
			changeEndY(rows);
		} else if (endY > rows - 1) {
			changeEndY(-rows);
		}

		if (startX === endX && startY === endY) {
			setEqual(true);
		} else {
			setEqual(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cols, endX, endY, rows, startX, startY]);

	const goToGamePage = () => {
		const newGrid = new Array(rows);
		for (let i = 0; i < rows; i += 1) {
			newGrid[i] = new Array(cols);
		}

		for (let i = 0; i < rows; i += 1) {
			for (let j = 0; j < cols; j += 1) {
				newGrid[i][j] = [i, j];
			}
		}
		makeGrid(newGrid);
		handleMaxLevel(cols, rows);
		startGame();
		// eslint-disable-next-line react/prop-types
		history.push('/game');
	};

	const handleReset = () => {
		gameResetHandler();
		gameConfigResetHandler();
	};

	return (
		<Wrapper>
			<Heading>Pathfinding application</Heading>
			<Paragraph>Available algorithms are: A* Search, Breadth-first Search and Dijkstra.</Paragraph>
			<InformationDiv>
				<Container>
					<Paragraph>
						Grid size is:
						{' '}
						{cols}
						{' '}
						columns and
						{' '}
						{rows}
						{' '}
						rows
					</Paragraph>
					<SizeContainer>
						<Paragraph>Columns: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => changeColumnSize(-1)}>-</SizeButton>
						<Size>{cols}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => changeColumnSize(1)}>+</SizeButtonRight>
					</SizeContainer>
					<SizeContainer>
						<Paragraph>Rows: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => changeRowSize(-1)}>-</SizeButton>
						<Size>{rows}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => changeRowSize(1)}>+</SizeButtonRight>
					</SizeContainer>
				</Container>
				<Container>
					<Paragraph>
						Start coordinates are x =
						{' '}
						{startX}
						{' '}
						and y =
						{' '}
						{startY}
					</Paragraph>
					<SizeContainer>
						<Paragraph>X: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => changeStartX(-1)}>-</SizeButton>
						<Size>{startX}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => changeStartX(1)}>+</SizeButtonRight>
					</SizeContainer>
					<SizeContainer>
						<Paragraph>Y: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => changeStartY(-1)}>-</SizeButton>
						<Size>{startY}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => changeStartY(1)}>+</SizeButtonRight>
					</SizeContainer>
				</Container>
				<Container>
					<Paragraph>
						End coordinates are x =
						{' '}
						{endX}
						{' '}
						and y =
						{' '}
						{endY}
					</Paragraph>
					<SizeContainer>
						<Paragraph>X: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => changeEndX(-1)}>-</SizeButton>
						<Size>{endX}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => changeEndX(1)}>+</SizeButtonRight>
					</SizeContainer>
					<SizeContainer>
						<Paragraph>Y: </Paragraph>
						<SizeButton disabled={gameStarted} onClick={() => changeEndY(-1)}>-</SizeButton>
						<Size>{endY}</Size>
						<SizeButtonRight disabled={gameStarted} onClick={() => changeEndY(1)}>+</SizeButtonRight>
					</SizeContainer>
				</Container>
			</InformationDiv>
			<LinkContainer>
				<StyledButton disabled={equal} onClick={goToGamePage}>Play/Run</StyledButton>
				<StyledButton onClick={handleReset}>Reset</StyledButton>
			</LinkContainer>
			{equal ? <ErrorParagraph>Start and end are equal, please change one!</ErrorParagraph> : null}
		</Wrapper>
	);
};

const mapStateToProps = state => ({
	startX: state.gameConfig.startX,
	startY: state.gameConfig.startY,
	endX: state.gameConfig.endX,
	endY: state.gameConfig.endY,
	cols: state.gameConfig.cols,
	rows: state.gameConfig.rows,
	gameStarted: state.game.gameStarted,
});

const mapDispatchToProps = dispatch => (
	{
		changeColumnSize: value => dispatch(gameConfigActions.changeColumnSize(value)),
		changeRowSize: value => dispatch(gameConfigActions.changeRowSize(value)),
		changeStartX: value => dispatch(gameConfigActions.changeStartX(value)),
		changeStartY: value => dispatch(gameConfigActions.changeStartY(value)),
		changeEndX: value => dispatch(gameConfigActions.changeEndX(value)),
		changeEndY: value => dispatch(gameConfigActions.changeEndY(value)),
		makeGrid: grid => dispatch(gameConfigActions.makeGrid(grid)),
		handleMaxLevel: (num1, num2) => dispatch(gameActions.handleMaxLevel(num1, num2)),
		startGame: () => dispatch(gameActions.startGame()),
		gameResetHandler: () => dispatch(gameActions.gameResetHandler()),
		gameConfigResetHandler: () => dispatch(gameConfigActions.gameConfigResetHandler()),
	}
);

HomePage.propTypes = {
	cols: propTypes.number.isRequired,
	rows: propTypes.number.isRequired,
	startX: propTypes.number.isRequired,
	startY: propTypes.number.isRequired,
	endX: propTypes.number.isRequired,
	endY: propTypes.number.isRequired,
	changeColumnSize: propTypes.func.isRequired,
	changeRowSize: propTypes.func.isRequired,
	changeStartX: propTypes.func.isRequired,
	changeStartY: propTypes.func.isRequired,
	changeEndX: propTypes.func.isRequired,
	changeEndY: propTypes.func.isRequired,
	makeGrid: propTypes.func.isRequired,
	handleMaxLevel: propTypes.func.isRequired,
	startGame: propTypes.func.isRequired,
	gameStarted: propTypes.bool.isRequired,
	gameResetHandler: propTypes.func.isRequired,
	gameConfigResetHandler: propTypes.func.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	history: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
