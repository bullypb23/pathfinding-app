import * as actionTypes from '../actions/actionTypes';

const START_X = 0;
const START_Y = 4;
const END_X = 9;
const END_Y = 4;
const COLS = 10;
const ROWS = 10;

const initialState = {
	startX: START_X,
	startY: START_Y,
	endX: END_X,
	endY: END_Y,
	cols: COLS,
	rows: ROWS,
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
	case actionTypes.GAME_CONFIG_RESET_HANDLER:
		return {
			...state,
			startX: START_X,
			startY: START_Y,
			endX: END_X,
			endY: END_Y,
			cols: COLS,
			rows: ROWS,
			grid: [],
		};
	default: return state;
	}
};

export default reducer;
