import getDerivedStateFromProps from './getDerivedStateFromProps'
/**
 * Mimics React.Component this.setState
 * @param {ReducerState} prevState - previous reducer state
 * @param {Object} action - the state keys to overwrite
 * @returns {ReducerState} - the next state for the reducer
 */
const defaultReducer = (prevState, action) => getDerivedStateFromProps(prevState, action)

export default defaultReducer
