import getDerivedStateFromProps from './getDerivedStateFromProps';
import isFunction from './isFunction';
/**
 * Mimics React.Component this.setState
 * @param {ReducerState} state - current reducer state
 * @param {ReducerState|Function} action - the state keys to overwrite
 * @returns {ReducerState} - the next state for the reducer
 */
const defaultReducer = (state, action) => {
   const nextState = isFunction(action) ? action(state) : action;
   return getDerivedStateFromProps(state, nextState)
};

export default defaultReducer;
