import isFunction from './isFunction';
import getReducerDefaultState from './getReducerDefaultState';

/**
 * This function returns one reducer if it is a Function
 * otherwise, it combines an object of reducer functions
 * @param {Reducer|Object.<string, Reducer>} reducers - reducer(s) to combine
 * @param {ReducerState} initialState - the initial state of the reducer
 * @returns {Array.<ReducerState, Reducer|CombinedReducers>} - an array of
 * [globalState, globalReducer]
 * */
const combineReducers = (reducers, initialState) => {
  // If a single reducer return
  if (isFunction(reducers)) {
    const state = initialState || getReducerDefaultState(reducers);
    return [state, reducers];
  }

  /**
   * Global reducer function; this is passed to the useReducer hook
   * @param {ReducerState} state - reducer state
   * @param {ReducerAction} action - action
   * @returns {Array.<ReducerState, Reducer|CombinedReducers>} - combined reducers
   */
  const globalReducerFunction = (state = {}, action) => {
    let hasStateChanged = false;
    const updatedStateByReducers = {};

    /**
     * this is where dispatching happens;
     * the action is passed to all reducers one by one.
     * we iterate and pass the action to each reducer and this would return new
     * state if applicable.
     */
    const reducerKeys = Object.keys(reducers);
    for (let i = 0; i < reducerKeys.length; i++) {
      const reducerKey = reducerKeys[i];
      if (Object.prototype.hasOwnProperty.call(reducers, reducerKey)) {
        const currentStateByKey = state[reducerKey];
        const currentReducer = reducers[reducerKey];


        const returnedStateByReducer = currentReducer(currentStateByKey, action);

        const areStateByKeyEqual = returnedStateByReducer !== currentStateByKey;

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
    const globalState = Object.entries(reducers).reduce(
      (acc, [key, reducer]) => {
        if (isFunction(reducer)) {
          acc[key] = getReducerDefaultState(reducer);
        } else {
          throw new Error(`${reducer} is not a function!`);
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
