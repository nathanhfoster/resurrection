import { useContext, useMemo } from 'react'
import usePreviousValue from './usePreviousValue'
import { isFunction, shallowEquals } from '../utils'
import { ContextConsumer } from '../provider'

const defaultIsEqual = (nextSelector, previousSelector) =>
  shallowEquals(previousSelector, nextSelector)

/**
 * This hook simulates Redux's useSelector hook
 * @param {Function} mapStateToSelector - similar to mapStateProps.
 * @param {Boolean|Function=} isEqual - a Boolean that determines
 * if the component should be memoized
 * or an equality Function that determines if the selector's returned value should be recomputed
 * @param {Object=} contextConsumer - the context consumer
 * @returns {React.FunctionComponent} - a memoized component
 * */

const useSelector = (
  mapStateToSelector,
  isEqual = defaultIsEqual,
  contextConsumer = ContextConsumer,
) => {
  const { state } = useContext(contextConsumer)

  const previousSelector = usePreviousValue(
    isFunction(mapStateToSelector) ? mapStateToSelector(state) : null,
  )

  const selector = useMemo(() => {
    if (isEqual && previousSelector) {
      const nextSelector = mapStateToSelector(state)
      const shouldUpdate = !isEqual(nextSelector, previousSelector)
      if (shouldUpdate) {
        return nextSelector
      }
    }
    return previousSelector
  }, [state, isEqual])

  return selector
}

export default useSelector
