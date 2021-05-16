import { useContext, useMemo } from 'react';
import usePreviousValue from './usePreviousValue';
import { isFunction, shallowEquals } from '../utils';
import { ContextConsumer } from '../provider';

/**
 * Shallow equality function
 * @param {*} currentSelector - the current selected state
 * @param {*} previousSelector - the previous selected state
 * @returns {Boolean} - whether the two selected states are equal
 */
const defaultIsEqual = (currentSelector, previousSelector) => shallowEquals(
  previousSelector,
  currentSelector,
);

/**
 * This hook simulates Redux's useSelector hook
 * The problem is that the useContext API always causes a rerender
 * If you want memoization, use the connect API
 * @param {MapStateToSelector} mapStateToSelector - similar to mapStateProps
 * @param {SelectorEqualityFunction=} isEqual - determines if the
 * selector's returned value should be recomputed
 * @param {React.ContextConsumer=} contextConsumer - the context consumer
 * @returns {React.FunctionComponent} - a memoized component
 * */

const useSelector = (
  mapStateToSelector,
  isEqual = defaultIsEqual,
  contextConsumer = ContextConsumer,
) => {
  if (!isFunction(mapStateToSelector)) {
    throw new Error('The first argument mapStateToSelector must be a function');
  }

  const { state } = useContext(contextConsumer);

  const currentSelector = useMemo(() => mapStateToSelector(state), [state]);

  const previousSelector = usePreviousValue(currentSelector);

  if (previousSelector) {
    const shouldUpdate = !isEqual(currentSelector, previousSelector);
    if (shouldUpdate) {
      return currentSelector;
    }
  }

  return previousSelector;
};

export default useSelector;
