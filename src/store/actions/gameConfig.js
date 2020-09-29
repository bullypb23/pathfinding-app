import * as actionTypes from './actionTypes';

export const setGrid = (x, y) => (
	{
		type: actionTypes.SET_GRID,
		x,
		y,
	}
);

export const setStart = (x, y) => (
	{
		type: actionTypes.SET_START,
		x,
		y,
	}
);

export const setEnd = (x, y) => (
	{
		type: actionTypes.SET_END,
		x,
		y,
	}
);

export const gameConfigResetHandler = () => (
	{
		type: actionTypes.GAME_CONFIG_RESET_HANDLER,
	}
);

export const toggleAlgorithm = algorithm => (
	{
		type: actionTypes.TOGGLE_ALGORITHM,
		algorithm,
	}
);
