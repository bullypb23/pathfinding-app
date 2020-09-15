import React, { useEffect } from 'react';
import './App.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import styled from 'styled-components';
// import Grid from './components/Grid';
import Header from './components/Header';
import HomePage from './components/HomePage';
import * as actions from './store/actions/gameConfig';

const Container = styled.div`
	width: 100%;
	padding: 30px 0;
`;

const App = ({ cols, rows, makeGrid }) => {
	useEffect(() => {
		const grid = new Array(cols);
		for (let i = 0; i < cols; i += 1) {
			grid[i] = new Array(rows);
		}
		makeGrid(grid);
	}, []);

	return (
		<div className="App">
			<Header />
			<Container>
				<Switch>
					<Route exact path="/" component={HomePage} />
					{/* <Route path="/game" component={Grid} /> */}
					<Redirect to="/" />
				</Switch>
			</Container>
		</div>
	);
};

App.propTypes = {
	cols: propTypes.number.isRequired,
	rows: propTypes.number.isRequired,
	makeGrid: propTypes.func.isRequired,
};

const mapStateToProps = state => (
	{
		cols: state.gameConfig.cols,
		rows: state.gameConfig.rows,
	}
);

const mapDispatchToProps = dispatch => (
	{
		makeGrid: grid => dispatch(actions.makeGrid(grid)),
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
