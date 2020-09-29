import * as actionTypes from './actionTypes';

export const makeGrid = grid => (
	{
		type: actionTypes.MAKE_GRID,
		grid,
	}
);

export const addResult = algorithmData => (
	{
		type: actionTypes.ADD_RESULT,
		algorithmData,
	}
);

export const nextLevelHandler = () => (
	{
		type: actionTypes.NEXT_LEVEL_HANDLER,
	}
);

export const addBlocks = block => (
	{
		type: actionTypes.ADD_BLOCKS,
		block,
	}
);

export const handleMaxLevel = (num1, num2) => (
	{
		type: actionTypes.MAX_LEVEL_HANDLER,
		num1,
		num2,
	}
);

export const handleAlgorithmReplay = (name, info, levelNum) => (
	{
		type: actionTypes.HANDLE_ALGORITHM_REPLAY,
		name,
		info,
		levelNum,
	}
);

export const handleNoResult = () => (
	{
		type: actionTypes.HANDLE_NO_RESULT,
	}
);

export const startGame = () => (
	{
		type: actionTypes.HANDLE_GAME_START,
	}
);

export const gameResetHandler = () => (
	{
		type: actionTypes.GAME_RESET_HANDLER,
	}
);

export const setAutomatic = () => (
	{
		type: actionTypes.AUTOMATIC_HANDLER,
	}
);
