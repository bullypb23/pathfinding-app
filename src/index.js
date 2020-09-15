/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import gameConfigReducer from './store/reducers/gameConfig';
import dataReducer from './store/reducers/data';

const rootReducer = combineReducers({
	gameConfig: gameConfigReducer,
	data: dataReducer,
});

const store = createStore(
	rootReducer,
	typeof window === 'object' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
		? window.__REDUX_DEVTOOLS_EXTENSION__()
		: f => f
);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);
