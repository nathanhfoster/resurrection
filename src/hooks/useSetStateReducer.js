import { useReducer } from 'react';
import { defaultReducer, defaultInitializer } from '../utils';

/**
 * Mimics React.Component this.state and this.setState
 * @param {ReducerState=} initializerArg - initialState
 * @param {ReducerStateInitializer=} initializer - initilizes the reducer's state
 * @returns {Array.<ReducerState, function(): ReducerState>} - the new useReducer hook
 */
const useSetStateReducer = (initializerArg = {}, initializer = defaultInitializer) => useReducer(
    defaultReducer,
    initializerArg,
    initializer
  );

  export default useSetStateReducer;