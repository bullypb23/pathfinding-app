import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid';
import Header from './components/Header';
import HomePage from './components/HomePage';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'; 
import * as actions from './store/actions/gameConfig';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 30px 0;
`;

class App extends Component {
  componentDidMount() {
    let grid = new Array(this.props.gridSize.cols);
    for (let i = 0; i < this.props.gridSize.cols; i++) {
      grid[i] = new Array(this.props.gridSize.rows);
    }
    this.props.makeGrid(grid);
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/game' component={Grid} />
            <Redirect to='/' />
          </Switch>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    gridSize: state.gameConfig.gridSize,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    makeGrid: (grid) => dispatch(actions.makeGrid(grid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
