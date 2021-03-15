import isFunction from './isFunction'
/**
 * This function returns one reducer if it is a Function
 * otherwise, it combines an object of reducer functions
 * @param {Function|Object} reducers - first object to compare
 * @param {Object} initialState - the initial state of the reducer
 * @returns {Array.<Object, Function|Object.<String, Function>>} - an array of
 * [globalState, globalReducer]
 * */
const combineReducers = (reducers, initialState) => {
  // If a single reducer return
  if (isFunction(reducers)) {
    return [initialState || {}, reducers]
  }

  /**
   * Global reducer function; this is passed to the useReducer hook
   * @param {Object} state - reducer state
   * @param {Object} action - action
   * @returns {Object} - combined reducers
   */
  const globalReducerFunction = (state, action) => {
    let hasStateChanged = false
    const updatedStateByReducers = {}

    /**
     * this is where dispatching happens;
     * the action is passed to all reducers one by one.
     * we iterate and pass the action to each reducer and this would return new
     * state if applicable.
     */
    for (let i = 0; i < reducers.length; i++) {
      const reducerKey = reducers[i]
      if (Object.prototype.hasOwnProperty.call(reducers, reducerKey)) {
        const currentStateByKey = state[reducerKey]
        const currentReducer = reducers[reducerKey]

        const returnedStateByReducer = currentReducer(currentStateByKey, action)

        const areStateByKeyEqual = returnedStateByReducer !== currentStateByKey

        hasStateChanged = hasStateChanged || areStateByKeyEqual

        updatedStateByReducers[reducerKey] = returnedStateByReducer
      }
    }
    return hasStateChanged ? updatedStateByReducers : state
  }
  let combinedStateAndReducers

  if (initialState) {
    combinedStateAndReducers = [initialState, globalReducerFunction]
  } else {
    // set default state returned by reducer and its reducer
    const globalState = Object.entries(reducers).reduce((acc, [key, reducer]) => {
      if (isFunction(reducer)) {
        acc[key] = reducer(undefined, {
          type: '__@@PLACEHOLDER_ACTION__',
        })
      } else {
        throw new Error(`${reducer} is not a function`)
      }
      return acc
    }, {})
    combinedStateAndReducers = [globalState, globalReducerFunction]
  }

  return combinedStateAndReducers
}

export default combineReducers
