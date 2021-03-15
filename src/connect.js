import React, { memo, useCallback, useContext, useMemo } from 'react'
import { isFunction, bindActionCreators, shallowEquals } from './utils'
import { usePreviousValue } from './hooks'
import { ContextConsumer } from './provider'

/**
 * Determines if the component should be memoized
 * or an equality Function that determines if the Component should rerender
 * @typedef {Object} ConnectOptions
 * @property {Object} context - a context consumer.
 * You need to pass the instance of your context to both
 * <ContextProvider /> and your connected component.
 * You may pass the context to your connected component either
 * by passing it here as a field of option,
 * or as a prop to your connected component in rendering.
 * @property {Boolean} pure - When options.pure is true,
 * connect performs several equality checks that are used to avoid unnecessary calls to
 * mapStateToProps,
 * mapDispatchToProps,
 * mergeProps,
 * and ultimately to render.
 * These include areStatesEqual,
 * areOwnPropsEqual,
 * areStatePropsEqual,
 * and areMergedPropsEqual.
 * While the defaults are probably appropriate 99% of the time,
 * you may wish to override them with custom implementations for performance or other reasons.
 * @property {Function=} areStatesEqual - When pure, compares incoming store state
 * to its previous value.
 * areStatesEqual: (next: Object, prev: Object) => boolean
 * @property {Function=} areOwnPropsEqual - When pure, compares the result of ownProps
 * to its previous value.
 * areOwnPropsEqual: (next: Object, prev: Object) => boolean
 * @property {Function=} areStatePropsEqual - When pure, compares the result of mapStateToProps
 * to its previous value.
 * areStatePropsEqual: (next: Object, prev: Object) => boolean
 * @property {Function=} areMergedPropsEqual - When pure, compares the result of mergeProps
 * to its previous value.
 * areMergedPropsEqual: (next: Object, prev: Object) => boolean
 * @property {Function=} forwardRef - If {forwardRef : true} has been passed to connect,
 * adding a ref to the connected wrapper component will actually
 * return the instance of the wrapped component.
 * */

/**
 * This function simulates Redux's connect API
 * @param {Function} mapStateToProps - reducer dispatch API
 * @param {Object|Function} mapDispatchToProps - reducer state
 * @param {Function=} mergeProps - function to merge props
 * @param {ConnectOptions=} contextConsumer - the context consumer
 * @returns {React.FunctionComponent} - a memoized component
 * */

const connect = (mapStateToProps, mapDispatchToProps, mergeProps, options) => Component => {
  const {
    context = ContextConsumer,
    pure = true,
    // TODO:
    // areStatesEqual = shallowEquals,
    // areOwnPropsEqual = shallowEquals,
    areStatePropsEqual = shallowEquals,
    areMergedPropsEqual = shallowEquals,
    // forwardRef = false,
  } = options || {}
  // Conditionally memoize Component
  const MemoizedComponent = pure === true ? memo(Component, areStatePropsEqual) : Component
  return ownProps => {
    const { state, dispatch } = useContext(context)

    const stateToProps = useMemo(() => {
      if (isFunction(mapStateToProps)) {
        return mapStateToProps(state, ownProps)
      }
      return {}
    }, [state, ownProps])

    const dispatchToProps = useMemo(() => {
      if (!mapDispatchToProps) {
        return {}
      }
      if (isFunction(mapDispatchToProps)) {
        return mapDispatchToProps(dispatch)
      }
      return bindActionCreators(mapDispatchToProps, dispatch)
    }, [dispatch])

    const prevMergeProps = usePreviousValue(mergeProps)

    const handleMergeProps = useCallback(
      (stateProps, dispatchProps, props) => {
        const getMergedProps = merge =>
          isFunction(merge)
            ? merge(stateProps, dispatchProps, props)
            : { ...props, ...stateProps, ...dispatchProps }

        const nextMergedProps = getMergedProps(mergeProps)

        if (!pure || (prevMergeProps && !areMergedPropsEqual(nextMergedProps, prevMergeProps))) {
          return nextMergedProps
        }

        return getMergedProps(prevMergeProps)
      },
      [prevMergeProps],
    )

    const mergedProps = useMemo(() => handleMergeProps(stateToProps, dispatchToProps, ownProps), [
      ownProps,
      handleMergeProps,
      stateToProps,
      dispatchToProps,
    ])

    return <MemoizedComponent {...mergedProps} dispatch={dispatch} />
  }
}

export default connect
