import React from 'react';
import './App.css';
import {
	Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import styled from 'styled-components';
import Game from './components/Game';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Levels from './components/Levels';
import Replay from './components/Replay';

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
				<Route path="/levels" component={Levels} />
				<Route path="/replay" component={Replay} />
				<Redirect to="/" />
			</Switch>
		</Container>
	</div>
);

export default withRouter(App);
