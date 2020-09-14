import * as actionTypes from '../actions/actionTypes';

let initialState = {
  start: { x: 0, y: 4 },
  end: { x: 9, y: 4 },
  gridSize: { cols: 10, rows: 10 },
  grid: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MAKE_GRID:
      return {
        ...state,
        grid: action.grid,
      }
    case actionTypes.CHANGE_COLUMN_SIZE:
      return {
        ...state,
        gridSize: {
          ...state.gridSize,
          cols: state.gridSize.cols + action.value,
        }
      }
    case actionTypes.CHANGE_ROW_SIZE:
      return {
        ...state,
        gridSize: {
          ...state.gridSize,
          rows: state.gridSize.rows + action.value,
        }
      }
    case actionTypes.CHANGE_START_X:
      return {
        ...state,
        start: {
          ...state.start,
          x: state.start.x + action.value,
        }
      }
    case actionTypes.CHANGE_START_Y:
      return {
        ...state,
        start: {
          ...state.start,
          y: state.start.y + action.value,
        }
      }
    case actionTypes.CHANGE_END_X:
      return {
        ...state,
        end: {
          ...state.end,
          x: state.end.x + action.value,
        }
      }
    case actionTypes.CHANGE_END_Y:
      return {
        ...state,
        end: {
          ...state.end,
          y: state.end.y + action.value,
        }
      }
    default: return state;
  }
}

export default reducer;