import { useReducer } from 'react';
import { setNumberReducer } from '@reducers';
import { useNumberReducerType } from '@types';
/**
 * Number reducer that increments/decrements the current state value or passes the state to the action if its a callback function
 * @param {Number} initializerArg - initial state of the reducer
 * @param {function(): Number} initializer - callback that initilizes the reducer's state
 * @returns {Number}
 */
export const useNumberReducer: useNumberReducerType = (initializerArg = -1, initializer = (a) => a) =>
  useReducer(setNumberReducer, initializerArg, initializer);

export default useNumberReducer;
