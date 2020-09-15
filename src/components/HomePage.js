import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../store/actions/gameConfig';

const Wrapper = styled.div`
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 4rem;
  color: #34495E;
  padding: 20px 0;
`;

const InformationDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const LinkContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
`;

const StyledButton = styled.button`
  color: white;
  background-color: #1ABC9C;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #26BFA1;
  }
`;

const Container = styled.div`
  flex-basis: 30%;
  padding: 20px;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  padding: 10px 0;
`;

const SizeButton = styled.div`
  outline: none;
  background-color: transparent;
  padding: 10px 15px;
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid #26BFA1;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  margin-left: 10px;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: #26BFA1;
    color: #fff;
  }
`;

const SizeButtonRight = styled(SizeButton)`
  margin-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
`;

const SizeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const Size = styled.div`
  padding: 10px 15px;
  font-size: 1.2rem;
  border: 1px solid #26BFA1;
`;

const ErrorParagraph = styled(Paragraph)`
  color: red;
`;

const HomePage = ({
	history, startX, startY, endX, endY, cols, rows, changeColumnSize, changeRowSize, changeStartX, changeStartY, changeEndX, changeEndY, makeGrid,
}) => {
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
		// eslint-disable-next-line react/prop-types
		history.push('/game');
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
						<SizeButton onClick={() => changeColumnSize(-1)}>-</SizeButton>
						<Size>{cols}</Size>
						<SizeButtonRight onClick={() => changeColumnSize(1)}>+</SizeButtonRight>
					</SizeContainer>
					<SizeContainer>
						<Paragraph>Rows: </Paragraph>
						<SizeButton onClick={() => changeRowSize(-1)}>-</SizeButton>
						<Size>{rows}</Size>
						<SizeButtonRight onClick={() => changeRowSize(1)}>+</SizeButtonRight>
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
						<Paragraph>Start X: </Paragraph>
						<SizeButton onClick={() => changeStartX(-1)}>-</SizeButton>
						<Size>{startX}</Size>
						<SizeButtonRight onClick={() => changeStartX(1)}>+</SizeButtonRight>
					</SizeContainer>
					<SizeContainer>
						<Paragraph>Start Y: </Paragraph>
						<SizeButton onClick={() => changeStartY(-1)}>-</SizeButton>
						<Size>{startY}</Size>
						<SizeButtonRight onClick={() => changeStartY(1)}>+</SizeButtonRight>
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
						<Paragraph>End X: </Paragraph>
						<SizeButton onClick={() => changeEndX(-1)}>-</SizeButton>
						<Size>{endX}</Size>
						<SizeButtonRight onClick={() => changeEndX(1)}>+</SizeButtonRight>
					</SizeContainer>
					<SizeContainer>
						<Paragraph>End Y: </Paragraph>
						<SizeButton onClick={() => changeEndY(-1)}>-</SizeButton>
						<Size>{endY}</Size>
						<SizeButtonRight onClick={() => changeEndY(1)}>+</SizeButtonRight>
					</SizeContainer>
				</Container>
			</InformationDiv>
			<LinkContainer>
				<StyledButton onClick={goToGamePage}>Play/Run</StyledButton>
			</LinkContainer>
			{startX === endX && startY === endY ? <ErrorParagraph>Start and end are equal, please change one!</ErrorParagraph> : null}
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
});

const mapDispatchToProps = dispatch => (
	{
		changeColumnSize: value => dispatch(actions.changeColumnSize(value)),
		changeRowSize: value => dispatch(actions.changeRowSize(value)),
		changeStartX: value => dispatch(actions.changeStartX(value)),
		changeStartY: value => dispatch(actions.changeStartY(value)),
		changeEndX: value => dispatch(actions.changeEndX(value)),
		changeEndY: value => dispatch(actions.changeEndY(value)),
		makeGrid: grid => dispatch(actions.makeGrid(grid)),
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
	// eslint-disable-next-line react/forbid-prop-types
	history: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
