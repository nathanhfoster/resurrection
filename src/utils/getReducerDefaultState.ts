import ActionTypes from './actionTypes';

/**
 * Initializes a reducers state
 * @param {Reducer} reducer - a reducer
 * @returns {ReducerState} - the returns default state
 */

const getReducerDefaultState = reducer => reducer(undefined, {
  type: ActionTypes.INIT,
});

export default getReducerDefaultState;
