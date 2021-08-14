import isFunction from './isFunction';
import getReducerDefaultState from './getReducerDefaultState';
import { combineReducersType, ReducerMap, ReducerStateType, ReducerType, StringMap } from '@types';

/**
 * This function returns one reducer if it is a Function
 * otherwise, it combines an object of reducer functions
 */
// @ts-ignore
const combineReducers: combineReducersType = (reducers, initialState) => {
  // If a single reducer return
  if (isFunction(reducers)) {
    const state: ReducerStateType = initialState || getReducerDefaultState(reducers as ReducerType);
    return [state, reducers];
  }

  /**
   * Global reducer function; this is passed to the useReducer hook
   */
  const globalReducerFunction: ReducerType = (state = initialState || {}, action) => {
    let hasStateChanged: boolean = false;

    /**
     * this is where dispatching happens;
     * the action is passed to all reducers one by one.
     * we iterate and pass the action to each reducer and this would return new
     * state if applicable.
     */
    const updatedStateByReducers = Object.entries(reducers as ReducerMap).reduce(
      (acc: StringMap, [key, reducer]: [string, ReducerType]) => {
        if (Object.prototype.hasOwnProperty.call(reducers, key)) {
          const currentStateByKey = state[key];

          const returnedStateByReducer: ReducerStateType = reducer(currentStateByKey, action);

          const areStateByKeyEqual: boolean = returnedStateByReducer !== currentStateByKey;

          hasStateChanged = hasStateChanged || areStateByKeyEqual;

          acc[key] = returnedStateByReducer;
        }
        return acc;
      },
      {}
    );

    return hasStateChanged ? updatedStateByReducers : state;
  };

  let combinedStateAndReducers;

  if (initialState) {
    combinedStateAndReducers = [initialState, globalReducerFunction];
  } else {
    // set default state returned by reducer and its reducer
    const globalState: ReducerStateType = Object.entries(reducers).reduce(
      (acc: StringMap, [key, reducer]: [string, ReducerType]) => {
        if (isFunction(reducer)) {
          acc[key] = getReducerDefaultState(reducer);
        } else {
          throw new Error(`${reducer.name} is not a function!`);
        }
        return acc;
      },
      {}
    );
    combinedStateAndReducers = [globalState, globalReducerFunction];
  }

  return combinedStateAndReducers;
};

export default combineReducers;
