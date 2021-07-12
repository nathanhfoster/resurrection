import { useRef, useCallback, useEffect } from 'react';
import {
  isFunction,
  getDerivedStateFromProps,
  defaultInitializer
} from '@utils';
import { useSetStateReducer, useLazyMemo } from '.';
import {
  ActionType,
  GetReducerStateType,
  ReducerStateType,
  ThunkActionDispatchType,
  ThunkActionType,
  ThunkType,
  useReducerWithThunkType
} from '@types';

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
  initialState,
  initializer = defaultInitializer,
  props
) => {
  // Get initial hook state once
  const getInitialHookState = useCallback(
    () => getDerivedStateFromProps(initialState, props),
    []
  );
  const initialHookState = useLazyMemo(getInitialHookState);

  const [hookState, setHookState] = useSetStateReducer(
    initialHookState,
    initializer
  );

  // State management
  const state = useRef<ReducerStateType>(hookState);

  const getState: GetReducerStateType = useCallback(
    () => state.current,
    [state]
  );

  const setState = useCallback(
    newState => {
      const derivedState = getDerivedStateFromProps(newState, props);
      const nextState = initializer(derivedState);
      state.current = nextState;
      setHookState(nextState);
    },
    [props, setHookState]
  );

  // make the state controlled from a HOC
  useEffect(() => {
    if (state.current) {
      setState(state.current);
    }
  }, [props]);

  // Reducer
  const reduce = useCallback(
    action => reducer(getState(), action),
    [reducer, getState]
  );

  /** Augmented dispatcher
   * @param {Action|ThunkActionDispatch} action - action
   * @returns {Thunk} - the new dispatch API
   */
  const dispatch: ThunkType = useCallback(
    (action: ActionType | ThunkActionType | ThunkActionDispatchType) => {
      if (isFunction(action)) {
        //@ts-ignore
        return action(dispatch, getState);
      }
      return setState(reduce(action));
    },
    [getState, setState, reduce]
  );

  return [hookState, dispatch];
};

export default useReducerWithThunk;
