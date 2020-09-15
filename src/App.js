import React from 'react';
import './App.css';
import {
	Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import styled from 'styled-components';
import Game from './components/Game';
import Header from './components/Header';
import HomePage from './components/HomePage';

const Container = styled.div`
	width: 100%;
	padding: 30px 0;
`;

const App = () => (
	<div className="App">
		<Header />
		<Container>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/game" component={Game} />
				<Redirect to="/" />
			</Switch>
		</Container>
	</div>
);

export default withRouter(App);
