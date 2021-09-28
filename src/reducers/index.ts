import { isFunction, getDerivedStateFromProps } from 'utils';
import { SetStateReducerType, SetObjectStateReducerType, BooleanReducerType, NumberReducerType } from 'types';

/**
 * A generic reducer that augments the useReducer hook
 * to return the state if the action is a callback
 */
export const setStateReducer: SetStateReducerType = (state, action) => (isFunction(action) ? action(state) : action);

/**
 * Allows a functional component to have
 * a setState API that is similar to a class component's this.setState
 */
export const setObjectStateReducer: SetObjectStateReducerType = (state, action) => {
  const nextStateToOverwrite = setStateReducer(state, action);
  const nextState = getDerivedStateFromProps(state, nextStateToOverwrite);

  return nextState;
};

/**
 * Toggles the boolean state if there is not an action passed in
 * else it sets the state to the action's passed value
 * @param {boolean} state - The current state of the reducer
 * @param {boolean=} action - The dispatched action
 * @returns {boolean} - The nextState of the reducer
 */
export const toggleBooleanReducer: BooleanReducerType = (state, action) => typeof action === 'boolean' ? action : !state;

/**
 * Passes the state to the action if it is a callback
 * Otherwise, increments/decrements
 * the number state from the passed action value
 * @param {Number} state - The current state of the reducer
 * @param {Number} action - The dispatched action
 * @returns {Number} - The nextState of the reducer
 */
export const setNumberReducer: NumberReducerType =
  // @ts-ignore
  (state, action) => (isFunction(action) ? action(state) : state + action);
