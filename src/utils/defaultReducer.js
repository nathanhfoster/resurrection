import getDerivedStateFromProps from './getDerivedStateFromProps'
/**
 * Mimics React.Component this.setState
 * @param {ReducerState} state - current reducer state
 * @param {ReducerState} action - the state keys to overwrite
 * @returns {ReducerState} - the next state for the reducer
 */
const defaultReducer = (state, action) =>
  getDerivedStateFromProps(state, action)

export default defaultReducer
