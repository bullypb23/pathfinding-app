import * as actionTypes from '../actions/actionTypes';

const START_X = 0;
const START_Y = 4;
const END_X = 9;
const END_Y = 4;
const COLS = 10;
const ROWS = 10;

const initialState = {
	start: {
		x: START_X,
		y: START_Y,
	},
	end: {
		x: END_X,
		y: END_Y,
	},
	gridSize: {
		cols: COLS,
		rows: ROWS,
	},
	algorithms: {
		astar: false,
		bfs: false,
		dijkstra: false,
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case actionTypes.SET_GRID:
		return {
			...state,
			gridSize: {
				cols: state.gridSize.cols + action.x,
				rows: state.gridSize.rows + action.y,
			},
		};
	case actionTypes.SET_START:
		return {
			...state,
			start: {
				x: state.start.x + action.x,
				y: state.start.y + action.y,
			},
		};
	case actionTypes.SET_END:
		return {
			...state,
			end: {
				x: state.end.x + action.x,
				y: state.end.y + action.y,
			},
		};
	case actionTypes.TOGGLE_ALGORITHM:
		return {
			...state,
			algorithms: {
				...state.algorithms,
				[action.algorithm]: !state.algorithms[action.algorithm],
			},
		};
	case actionTypes.GAME_CONFIG_RESET_HANDLER:
		return {
			...state,
			start: {
				x: START_X,
				y: START_Y,
			},
			end: {
				x: END_X,
				y: END_Y,
			},
			gridSize: {
				cols: COLS,
				rows: ROWS,
			},
			algorithms: {
				astar: false,
				bfs: false,
				dijkstra: false,
			},
		};
	default: return state;
	}
};

export default reducer;
