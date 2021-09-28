import { useRef, useCallback, MutableRefObject } from 'react';
import { setNumberReducer } from 'reducers';
import { useNumberRefType } from 'types';
/**
 * Same as the useNumberReducer but is asynchronous and does not trigger rerenders on setState
 * @param {Number} initializerArg - initial state of the reducer
 * @returns {Number} - the new useReducer hook
 */
const useNumberRef: useNumberRefType = (initializerArg = -1) => {
  const state: MutableRefObject<number> = useRef<number>(initializerArg);

  const setState = useCallback((action: number) => {
    const nextState = setNumberReducer(state.current, action);
    state.current = nextState;
  }, []);

  return [state.current, setState];
};

export default useNumberRef;
