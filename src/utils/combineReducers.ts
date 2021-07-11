import isFunction from './isFunction';
import getReducerDefaultState from './getReducerDefaultState';
import {
  combineReducersType,
  ReducerStateType,
  ReducerType,
  StringMap
} from '@types';

/**
 * This function returns one reducer if it is a Function
 * otherwise, it combines an object of reducer functions
 **/
// @ts-ignore
const combineReducers: combineReducersType = (reducers, initialState) => {
  // If a single reducer return
  if (isFunction(reducers)) {
    const state: ReducerStateType = initialState
      //@ts-ignore
      || getReducerDefaultState(reducers);
    return [state, reducers];
  }

  /**
   * Global reducer function; this is passed to the useReducer hook
   */
  const globalReducerFunction: ReducerType = (state = {}, action) => {
    let hasStateChanged: boolean = false;
    const updatedStateByReducers: StringMap = {};

    /**
     * this is where dispatching happens;
     * the action is passed to all reducers one by one.
     * we iterate and pass the action to each reducer and this would return new
     * state if applicable.
     */
    const reducerKeys: string[] = Object.keys(reducers);
    for (let i = 0; i < reducerKeys.length; i++) {
      const reducerKey: string = reducerKeys[i];
      if (Object.prototype.hasOwnProperty.call(reducers, reducerKey)) {
        const currentStateByKey = state[reducerKey];
        //@ts-ignore
        const currentReducer: ReducerType = reducers[reducerKey];

        const returnedStateByReducer: ReducerStateType =
          currentReducer(currentStateByKey, action);

        const areStateByKeyEqual: boolean =
          returnedStateByReducer !== currentStateByKey;

        hasStateChanged = hasStateChanged || areStateByKeyEqual;

        updatedStateByReducers[reducerKey] = returnedStateByReducer;
      }
    }
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
      {},
    );
    combinedStateAndReducers = [globalState, globalReducerFunction];
  }

  return combinedStateAndReducers;
};

export default combineReducers;
