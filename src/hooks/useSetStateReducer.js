import { useRef, useReducer, useCallback, useEffect } from 'react';
import { isFunction, defaultReducer } from '../utils';

/**
 * Mimics React.Component this.state and this.setState
 * @param {ReducerState=} initializerArg - initial state of the reducer
 * @param {ReducerStateInitializer=} initializer - callback that initilizes the reducer's state
 * @returns {Array.<ReducerState, function(): ReducerState>} - the new useReducer hook
 */
const useSetStateReducer = (initializerArg = {}, initializer) => {
  // Temporarily holds the reference to a callback
  const callbackRef = useRef(null);
  const [state, setState] = useReducer(defaultReducer, initializerArg, initializer);

   /**
   * @param {ReducerState|function(): ReducerState} updater - the state keys to overwrite
   * @param {Function} callback - mimics the second parameter of this.setState
   * */
  const setStateWithCallback = useCallback((updater, callback) => {
    setState(updater);
    callbackRef.current = callback;
  }, []);

  // Call the callback after every state change
  useEffect(() => {
    if (isFunction(callbackRef.current)) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  return [state, setStateWithCallback];

 
};

export default useSetStateReducer;
