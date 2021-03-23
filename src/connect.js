import React, { memo, useCallback, useContext, useMemo } from 'react'
import { isFunction, bindActionCreators, shallowEquals } from './utils'
import { usePreviousValue } from './hooks'
import { ContextConsumer } from './provider'
import './types'

/**
 * This function simulates Redux's connect API
 * @param {MapStateToProps} mapStateToProps - reducer dispatch API
 * @param {MapDispatchToProps} mapDispatchToProps - reducer state
 * @param {Function=} mergeProps - function to merge props
 * @param {ConnectOptions=} options - options
 * @returns {React.memo|React.FunctionComponent} - a connected component
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
