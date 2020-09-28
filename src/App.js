import React from 'react';
import {
	Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import Game from './components/Game';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Levels from './components/Levels';
import Replay from './components/Replay';
import Global from './Global';
import { Wrapper, Container } from './App.styles';

const App = () => (
	<Wrapper>
		<Global />
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
	</Wrapper>
);

export default withRouter(App);
