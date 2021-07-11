import { getReducerDefaultStateType } from '@types';
import ActionTypes from './actionTypes';

/**
 * Initializes a reducers state
 */

const getReducerDefaultState: getReducerDefaultStateType =
  reducer =>
    reducer(undefined, {
      type: ActionTypes.INIT
    });

export default getReducerDefaultState;
