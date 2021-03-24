import { useContext, useMemo } from 'react';
import usePreviousValue from './usePreviousValue';
import { isFunction, shallowEquals } from '../utils';
import { ContextConsumer } from '../provider';

/**
 * This function allows the state to be controlled by a HOC by overwritting it with props
 * @param {*} nextSelector - state object
 * @param {*} previousSelector - props to make the state controlled from a HOC
 * @returns {Boolean} - whether the two selected states are equal
 */
const defaultIsEqual = (nextSelector,
  previousSelector) => shallowEquals(previousSelector, nextSelector);

/**
 * This hook simulates Redux's useSelector hook
 * @param {MapStateToSelector} mapStateToSelector - similar to mapStateProps.
 * @param {SelectorEqualityFunction=} isEqual - determines
 * if the selector's returned value should be recomputed
 * @param {React.ContextConsumer=} contextConsumer - the context consumer
 * @returns {React.FunctionComponent} - a memoized component
 * */

const useSelector = (
  mapStateToSelector,
  isEqual = defaultIsEqual,
  contextConsumer = ContextConsumer,
) => {
  const { state } = useContext(contextConsumer);

  const previousSelector = usePreviousValue(
    isFunction(mapStateToSelector) ? mapStateToSelector(state) : null,
  );

  const selector = useMemo(() => {
    if (isEqual && previousSelector) {
      const nextSelector = mapStateToSelector(state);
      const shouldUpdate = !isEqual(nextSelector, previousSelector);
      if (shouldUpdate) {
        return nextSelector;
      }
    }
    return previousSelector;
  }, [state, isEqual]);

  return selector;
};

export default useSelector;
