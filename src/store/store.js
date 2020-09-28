/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers } from 'redux';
import gameConfigReducer from './reducers/gameConfig';
import gameReducer from './reducers/game';

const rootReducer = combineReducers({
	gameConfig: gameConfigReducer,
	game: gameReducer,
});

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(
	rootReducer,
	typeof window === 'object' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
		? window.__REDUX_DEVTOOLS_EXTENSION__()
		: f => f
);
