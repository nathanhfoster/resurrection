import { ReducerType } from '@types';
import { isFunction, getDerivedStateFromProps } from '.';

/**
 * Mimics React.Component this.setState
 */
const setStateReducer: ReducerType = (state, action) => {
  //@ts-ignore
  const nextStateToOverwrite = isFunction(action) ? action(state) : action;
  const nextState = getDerivedStateFromProps(state, nextStateToOverwrite);

  return nextState;
};

export default setStateReducer;
