import * as actionTypes from '../actions/actionTypes';

const initialState = {
	astar: false,
	bfs: false,
	dijkstra: false,
	levels: {},
	level: 1,
	blocks: {},
	maxLevel: 1,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case actionTypes.TOGGLE_ALGORITHM:
		return {
			...state,
			[action.algorithm]: !state[action.algorithm],
		};
	case actionTypes.ADD_RESULT:
		return {
			...state,
			levels: {
				...state.levels,
				[state.level]: {
					...state.levels[state.level],
					[action.algorithmData.name]: {
						path: action.algorithmData.path,
						visitedNodes: action.algorithmData.visitedNodes,
						time: action.algorithmData.time,
					},
				},
			},
		};
	case actionTypes.NEXT_LEVEL_HANDLER:
		return {
			...state,
			level: state.level + 1,
			blocks: {
				...state.blocks,
				[state.level + 1]: [],
			},
		};
	case actionTypes.MAX_LEVEL_HANDLER:
		return {
			...state,
			maxLevel: (action.num1 * action.num2) - 1,
		};
	case actionTypes.ADD_BLOCKS:
		return {
			...state,
			blocks: {
				...state.blocks,
				[state.level]: [
					action.block,
				],
			},
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
	default: return state;
	}
};

export default reducer;
