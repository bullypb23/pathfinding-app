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
