import { useRef, useCallback, } from 'react';
import { isFunction, getDerivedStateFromProps, defaultInitializer, getReducerDefaultState } from 'utils';
import { useSetStateReducer, useLazyMemo, useMountedEffect } from '.';
import {
  ActionType,
  DispatchType,
  GetReducerStateType,
  ReducerStateType,
  ThunkActionType,
  useReducerWithThunkType,
  ReducerStateInitializerType
} from 'types';

/**
 * Mimics React.Component this.setState
 * @param {ReducerState} prevState - the reducer's previous state
 * @param {ReducerState} nextState - the state to overwrite
 * @returns {ReducerState} - the next state for the reducer
 */

/**
 * Augments React's useReducer() hook
 * so that the action dispatcher supports thunks.
 */
const useReducerWithThunk: useReducerWithThunkType = (
  reducer,
  initialState = getReducerDefaultState(reducer),
  initializer = defaultInitializer,
  props
) => {
  // Get initial hook state once
  const getInitialHookState = useCallback(() => getDerivedStateFromProps(initialState, props), []);
  const initialHookState = useLazyMemo(getInitialHookState);

  const [hookState, setHookState] = useSetStateReducer(initialHookState, initializer);

  // State management
  const state = useRef<ReducerStateType>(hookState);

  const getState: GetReducerStateType = useCallback(() => state.current, [state]);

  const setState = useCallback(
    (newState, callback?: () => any) => {
      const derivedState = getDerivedStateFromProps(newState, props);
      const nextState = initializer(derivedState);
      state.current = nextState;
      setHookState(nextState, callback);
    },
    [props, setHookState]
  );

  // make the state controlled from an HOC
  useMountedEffect(() => {
    setState(state.current);
  }, [props]);

  // Reducer
  const reduce: ReducerStateInitializerType = useCallback((action) => reducer(getState(), action), [reducer, getState]);

  // Augmented dispatcher
  const dispatch: ActionType | DispatchType | ThunkActionType = useCallback(
    (action: ActionType | ThunkActionType | DispatchType) => {
      if (isFunction(action)) {
        return action(dispatch as any, getState);
      }
      return setState(reduce(action));
    },
    [getState, setState, reduce]
  );

  return [hookState, dispatch];
};


export default useReducerWithThunk;
