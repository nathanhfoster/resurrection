import { useRef, useCallback, SetStateAction } from 'react';
import { setStateReducer } from 'reducers';
import type { useSetRefStateType } from 'types';
/**
 * Similar to the useSetObjectStateReducer but does not trigger rerenders since useState and useReducer are asynchronous while useRef is synchronous.
 * @param {*} initializerArg - Any value
 * @returns {Array.<*, *>, function(): void>}
 */
const useSetRefState: useSetRefStateType = (initializerArg) => {
  const state = useRef(initializerArg);
  const setState = useCallback((action: SetStateAction<any>) => {
    const nextState = setStateReducer(state.current, action);
    state.current = nextState;
  }, []);

  return [state.current, setState];
};

export default useSetRefState;
