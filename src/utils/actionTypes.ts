import { StringMap } from '@types';
import getRandomString from './getRandomString';

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */

const ActionTypes: StringMap = {
  INIT: `@@redux/INIT${getRandomString()}`,
  REPLACE: `@@redux/REPLACE${getRandomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${getRandomString()}`
};

export default ActionTypes;
