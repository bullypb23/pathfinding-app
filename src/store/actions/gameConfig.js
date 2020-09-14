import * as actyonTypes from './actionTypes';

export const makeGrid = grid => {
  return {
    type: actyonTypes.MAKE_GRID,
    grid
  }
}

export const changeColumnSize = value => {
  return {
    type: actyonTypes.CHANGE_COLUMN_SIZE,
    value
  }
}

export const changeRowSize = value => {
  return {
    type: actyonTypes.CHANGE_ROW_SIZE,
    value
  }
}

export const changeStartX = value => {
  return {
    type: actyonTypes.CHANGE_START_X,
    value
  }
}

export const changeStartY = value => {
  return {
    type: actyonTypes.CHANGE_START_Y,
    value
  }
}

export const changeEndX = value => {
  return {
    type: actyonTypes.CHANGE_END_X,
    value
  }
}

export const changeEndY = value => {
  return {
    type: actyonTypes.CHANGE_END_Y,
    value
  }
}