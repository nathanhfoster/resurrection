import { CallbackType, ReducerStateType, SetStateType, useSetStateReducerType } from 'types';
import { useRef, useReducer, useCallback, MutableRefObject, Dispatch } from 'react';
import { setObjectStateReducer } from '../reducers';
import useEffectAfterMount from './useEffectAfterMount';

const defaultCallback: CallbackType = () => {
  return;
};

/**
 * Mimics React.Component this.state and this.setState
 */
const useSetStateReducer: useSetStateReducerType = (initializerArg, initializer) => {
  // Temporarily holds the reference to a callback
  const callbackRef: MutableRefObject<CallbackType> = useRef(defaultCallback);
  const [state, dispatch]: [ReducerStateType, Dispatch<any>] = useReducer(
    setObjectStateReducer,
    initializerArg,
    initializer
  );

  /**
   * Augments the dispatch to accept a callback as a second parameter
   */
  const setState: SetStateType = useCallback((updater, callback) => {
    callbackRef.current = callback || defaultCallback;
    dispatch(updater);
  }, []);

  // Synchronously call the callback after every state change
  useEffectAfterMount(() => {
    callbackRef.current(state);
    callbackRef.current = defaultCallback;
  }, [state]);

  return [state, setState];
};

export default useSetStateReducer;
