import { isFunction, getDerivedStateFromProps } from '.'

/**
 * Mimics React.Component this.setState
 * @param {ReducerState} state - current reducer state
 * @param {ReducerState|function(): ReducerState} action - the state keys to overwrite
 * @returns {ReducerState} - the next state for the reducer
 */
const setStateReducer = (state, action) => {
  const nextStateToOverwrite = isFunction(action) ? action(state) : action
  const nextState = getDerivedStateFromProps(state, nextStateToOverwrite)

  return nextState
}

export default setStateReducer
