import { useBooleanReducerType } from 'types';
import { useReducer } from 'react';
import { toggleBooleanReducer } from 'reducers';

/**
 * Boolean reducer that toggles it's state by default or is overwritten by a passed value
 * @param {object.<string, *>=} initializerArg - initial state of the reducer
 * @param {function(): object.<string, *>=} initializer - callback that initilizes the reducer's state
 * @returns {Array.<boolean, function(action) => void>} - the new useReducer hook [toggle, setToggle]
 */
const useBooleanReducer: useBooleanReducerType = (initializerArg = false, initializer = (a) => a) =>
  useReducer(toggleBooleanReducer, initializerArg, initializer);

export default useBooleanReducer;
