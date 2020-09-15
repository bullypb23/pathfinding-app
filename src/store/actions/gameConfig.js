import * as actyonTypes from './actionTypes';

export const makeGrid = grid => (
	{
		type: actyonTypes.MAKE_GRID,
		grid,
	}
);

export const changeColumnSize = value => (
	{
		type: actyonTypes.CHANGE_COLUMN_SIZE,
		value,
	}
);

export const changeRowSize = value => (
	{
		type: actyonTypes.CHANGE_ROW_SIZE,
		value,
	}
);

export const changeStartX = value => (
	{
		type: actyonTypes.CHANGE_START_X,
		value,
	}
);

export const changeStartY = value => (
	{
		type: actyonTypes.CHANGE_START_Y,
		value,
	}
);

export const changeEndX = value => (
	{
		type: actyonTypes.CHANGE_END_X,
		value,
	}
);

export const changeEndY = value => (
	{
		type: actyonTypes.CHANGE_END_Y,
		value,
	}
);
