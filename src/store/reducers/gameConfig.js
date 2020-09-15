import * as actionTypes from '../actions/actionTypes';

const initialState = {
	startX: 0,
	startY: 4,
	endX: 9,
	endY: 4,
	cols: 10,
	rows: 10,
	grid: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case actionTypes.MAKE_GRID:
		return {
			...state,
			grid: action.grid,
		};
	case actionTypes.CHANGE_COLUMN_SIZE:
		return {
			...state,
			cols: state.cols + action.value,
		};
	case actionTypes.CHANGE_ROW_SIZE:
		return {
			...state,
			rows: state.rows + action.value,
		};
	case actionTypes.CHANGE_START_X:
		return {
			...state,
			startX: state.startX + action.value,
		};
	case actionTypes.CHANGE_START_Y:
		return {
			...state,
			startY: state.startY + action.value,
		};
	case actionTypes.CHANGE_END_X:
		return {
			...state,
			endX: state.endX + action.value,
		};
	case actionTypes.CHANGE_END_Y:
		return {
			...state,
			endY: state.endY + action.value,
		};
	default: return state;
	}
};

export default reducer;
