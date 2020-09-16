import * as actionTypes from './actionTypes';

export const toggleAlgorithm = algorithm => (
	{
		type: actionTypes.TOGGLE_ALGORITHM,
		algorithm,
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
