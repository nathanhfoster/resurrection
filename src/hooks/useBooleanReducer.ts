import { useBooleanReducerType } from '@types';
import { useReducer } from 'react';
import { toggleBooleanReducer } from '@reducers';

/**
 * Boolean reducer that toggles it's state by default or is overwritten by a passed value
 * @param {Object.<String, *>=} initializerArg - initial state of the reducer
 * @param {function(): Object.<String, *>=} initializer - callback that initilizes the reducer's state
 * @returns {Array.<Object.<String, *>, function(): Boolean>} - the new useReducer hook [toggle, setToggle]
 */
const useBooleanReducer: useBooleanReducerType = (initializerArg = false, initializer = (a) => a) =>
  useReducer(toggleBooleanReducer, initializerArg, initializer);

export default useBooleanReducer;
