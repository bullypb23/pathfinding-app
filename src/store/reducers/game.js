import * as actionTypes from '../actions/actionTypes';

const initialState = {
	grid: [],
	levels: {},
	level: 1,
	blocks: [],
	replay: {},
	maxLevel: 1,
	gameStarted: false,
	gameFinished: false,
	automatic: false,
	startRun: false,
	addedBlocks: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case actionTypes.MAKE_GRID:
		return {
			...state,
			grid: action.grid,
		};
	case actionTypes.ADD_RESULT:
		return {
			...state,
			levels: {
				...state.levels,
				[action.algorithmData.level]: {
					...state.levels[action.algorithmData.level],
					[action.algorithmData.name]: {
						path: action.algorithmData.path,
						visitedNodes: action.algorithmData.visitedNodes,
						time: action.algorithmData.time,
						blocks: action.algorithmData.wall,
					},
				},
			},
		};
	case actionTypes.NEXT_LEVEL_HANDLER:
		return {
			...state,
			level: state.level + 1,
			blocks: action.blocks,
		};
	case actionTypes.MAX_LEVEL_HANDLER:
		return {
			...state,
			maxLevel: (action.num1 * action.num2) - 1,
		};
	case actionTypes.HANDLE_ALGORITHM_REPLAY:
		return {
			...state,
			replay: {
				name: action.name,
				data: action.info,
				level: action.levelNum,
			},
		};
	case actionTypes.HANDLE_NO_RESULT:
		return {
			...state,
			gameFinished: true,
		};
	case actionTypes.HANDLE_GAME_START:
		return {
			...state,
			gameStarted: true,
		};
	case actionTypes.AUTOMATIC_HANDLER:
		return {
			...state,
			automatic: !state.automatic,
		};
	case actionTypes.GAME_RESET_HANDLER:
		return {
			...state,
			grid: [],
			levels: {},
			level: 1,
			blocks: [],
			replay: {},
			maxLevel: 1,
			gameStarted: false,
			gameFinished: false,
			automatic: false,
		};
	case actionTypes.START_RUN:
		return {
			...state,
			startRun: !state.startRun,
		};
	default: return state;
	}
};

export default reducer;
