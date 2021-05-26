import getDerivedStateFromProps from './getDerivedStateFromProps';
import isFunction from './isFunction';
/**
 * Mimics React.Component this.setState
 * @param {ReducerState} state - current reducer state
 * @param {ReducerState|function(): ReducerState} action - the state keys to overwrite
 * @param {Function} callback - mimics the second parameter of this.setState
 * @returns {ReducerState} - the next state for the reducer
 */

const defaultReducer = (state, action, callback) => {
  const nextStateToOverwrite = isFunction(action) ? action(state) : action;
  const nextState = getDerivedStateFromProps(state, nextState);
 
  if(isFunction(callback)) {
    callback(nextState);
  };

   return nextState;
};

export default defaultReducer;
