import * as actionTypes from '../actions/actionTypes';

const initialState = {
	astar: false,
	bfs: false,
	dijkstra: false,
	levels: {},
	level: 1,
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
		};
	default: return state;
	}
};

export default reducer;
