import { useReducer, useRef, useCallback, useEffect } from 'react'
import { isFunction, getDerivedStateFromProps, defaultReducer, defaultInitializer } from '../utils'
import useLazyMemo from './useLazyMemo'

/**
 * Mimics React.Component this.setState
 * @param {ReducerState} prevState - the reducer's previous state
 * @param {ReducerState} nextState - the state to overwrite
 * @returns {ReducerState} - the next state for the reducer
 */
const setStateHookReducer = defaultReducer

/**
 * Augments React's useReducer() hook so that the action dispatcher supports thunks.
 * @param {Reducer} reducer - reducer
 * @param {ReducerState=} initialState - initialState
 * @param {ReducerStateInitializer=} initializer - initilizes the reducer's state
 * @param {ComponentProps=} props - props to make the state controlled from a HOC
 * @returns {Array.<ReducerState, Thunk>} - the new useReducer hook
 */
const useReducerWithThunk = (reducer, initialState, initializer = defaultInitializer, props) => {
  // Get initial hook state once
  const getInitialHookState = useCallback(() => getDerivedStateFromProps(initialState, props), [])
  const initialHookState = useLazyMemo(getInitialHookState)

  const [hookState, setHookState] = useReducer(setStateHookReducer, initialHookState, initializer)

  // State management
  const state = useRef(hookState)

  const getState = useCallback(() => state.current, [state])

  const setState = useCallback(
    newState => {
      const nextState = getDerivedStateFromProps(newState, props)
      state.current = nextState
      setHookState(nextState)
    },
    [props, setHookState],
  )

  // Reducer
  const reduce = useCallback(action => reducer(getState(), action), [reducer, getState])

  /** Augmented dispatcher
   * @param {Action|ThunkActionDispatch} action - action
   * @returns {Thunk} - the new dispatch API
   */
  const dispatch = useCallback(
    action => {
      if (isFunction(action)) {
        return action(dispatch, getState)
      }
      return setState(reduce(action))
    },
    [getState, setState, reduce],
  )

  useEffect(() => {
    if (state.current) {
      state.current = getDerivedStateFromProps(state.current, props)
      setHookState(props)
    }
  }, [props])

  return [hookState, dispatch]
}

export default useReducerWithThunk
