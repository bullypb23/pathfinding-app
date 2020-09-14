import React, { useEffect } from 'react';
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
  text-decoration: none;
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

const HomePage = props => {
  useEffect(() => {
    if (props.gridSize.cols === 0) {
      props.changeColumnSize(10);
    }

    if (props.gridSize.rows === 0) {
      props.changeRowSize(10);
    }

    if (props.start.x < 0) {
      props.changeStartX(props.gridSize.cols);
    } else if (props.start.x > props.gridSize.cols - 1) {
      props.changeStartX(-props.gridSize.cols);
    }

    if (props.start.y < 0) {
      props.changeStartY(props.gridSize.rows);
    } else if (props.start.y > props.gridSize.rows - 1) {
      props.changeStartY(-props.gridSize.rows);
    }

    if (props.end.x < 0) {
      props.changeEndX(props.gridSize.cols);
    } else if (props.end.x > props.gridSize.cols - 1) {
      props.changeEndX(-props.gridSize.cols);
    }

    if (props.end.y < 0) {
      props.changeEndY(props.gridSize.rows);
    } else if (props.end.y > props.gridSize.rows - 1) {
      props.changeEndY(-props.gridSize.rows);
    }
  }, [props]);

  const goToGamePage = () => {
    props.history.push('/game');
  }

  return (
    <Wrapper>
      <Heading>Pathfinding application</Heading>
      <Paragraph>Available algorithms are: Dijkstra, A* Search and Breadth-first Search.</Paragraph>
      <InformationDiv>
        <Container>
          <Paragraph>Grid size is: {props.gridSize.cols} columns and {props.gridSize.rows} rows</Paragraph>
          <SizeContainer>
            <Paragraph>Columns: </Paragraph>
            <SizeButton onClick={() => props.changeColumnSize(-1)}>-</SizeButton>
            <Size>{props.gridSize.cols}</Size>
            <SizeButtonRight onClick={() => props.changeColumnSize(1)}>+</SizeButtonRight>
          </SizeContainer>
          <SizeContainer>
            <Paragraph>Rows: </Paragraph>
            <SizeButton onClick={() => props.changeRowSize(-1)}>-</SizeButton>
            <Size>{props.gridSize.rows}</Size>
            <SizeButtonRight onClick={() => props.changeRowSize(1)}>+</SizeButtonRight>
          </SizeContainer>
        </Container>
        <Container>
          <Paragraph>Start coordinates are x = {props.start.x} and y = {props.start.y}</Paragraph>
          <SizeContainer>
            <Paragraph>Start X: </Paragraph>
            <SizeButton onClick={() => props.changeStartX(-1)}>-</SizeButton>
            <Size>{props.start.x}</Size>
            <SizeButtonRight onClick={() => props.changeStartX(1)}>+</SizeButtonRight>
          </SizeContainer>
          <SizeContainer>
            <Paragraph>Start Y: </Paragraph>
            <SizeButton onClick={() => props.changeStartY(-1)}>-</SizeButton>
            <Size>{props.start.y}</Size>
            <SizeButtonRight onClick={() => props.changeStartY(1)}>+</SizeButtonRight>
          </SizeContainer>
        </Container>
        <Container>
          <Paragraph>End coordinates are x = {props.end.x} and y = {props.end.y}</Paragraph>
          <SizeContainer>
            <Paragraph>End X: </Paragraph>
            <SizeButton onClick={() => props.changeEndX(-1)}>-</SizeButton>
            <Size>{props.end.x}</Size>
            <SizeButtonRight onClick={() => props.changeEndX(1)}>+</SizeButtonRight>
          </SizeContainer>
          <SizeContainer>
            <Paragraph>End Y: </Paragraph>
            <SizeButton onClick={() => props.changeEndY(-1)}>-</SizeButton>
            <Size>{props.end.y}</Size>
            <SizeButtonRight onClick={() => props.changeEndY(1)}>+</SizeButtonRight>
          </SizeContainer>
        </Container>
      </InformationDiv>
      <LinkContainer>
        <StyledButton onClick={goToGamePage}>Play/Run</StyledButton>
      </LinkContainer>
      {props.start.x === props.end.x && props.start.y === props.end.y ? <ErrorParagraph>Start and end are equal, please change one!</ErrorParagraph> : null}
    </Wrapper>
  )
}

const mapStateToProps = state => {
  return {
    start: state.gameConfig.start,
    end: state.gameConfig.end,
    gridSize: state.gameConfig.gridSize,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeColumnSize: (value) => dispatch(actions.changeColumnSize(value)),
    changeRowSize: (value) => dispatch(actions.changeRowSize(value)),
    changeStartX: (value) => dispatch(actions.changeStartX(value)),
    changeStartY: (value) => dispatch(actions.changeStartY(value)),
    changeEndX: (value) => dispatch(actions.changeEndX(value)),
    changeEndY: (value) => dispatch(actions.changeEndY(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);