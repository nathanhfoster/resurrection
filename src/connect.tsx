import React, { memo, useContext, useMemo } from 'react';
import {
  isFunction,
  defaultMergeProps,
  bindActionCreators,
  shallowEquals,
} from './utils';
import { ContextConsumer } from './provider';
import './types';

/**
 * This function simulates Redux's connect API
 * @param {MapStateToProps=} mapStateToProps - reducer dispatch API
 * @param {MapDispatchToProps=} mapDispatchToProps - reducer state
 * @param {MergeProps=} mergeProps - function to merge props
 * @param {ConnectOptions=} options - options
 * @returns {React.memo|React.FunctionComponent} - a connected component
 * */

const connect = (mapStateToProps, mapDispatchToProps, mergeProps, options) => (
  Component,
) => {
  const {
    context = ContextConsumer,
    pure = true,
    // TODO:
    // areStatesEqual = shallowEquals,
    // areOwnPropsEqual = shallowEquals,
    // areStatePropsEqual = shallowEquals,
    areMergedPropsEqual = shallowEquals,
    // forwardRef = false,
  } = options || {};

  const handleMergeProps = isFunction(mergeProps)
    ? mergeProps
    : defaultMergeProps;

  // Conditionally memoize Component
  const PureComponent =
    pure === true ? memo(Component, areMergedPropsEqual) : Component;

  return (ownProps) => {
    const { state, dispatch } = useContext(context);
    const stateToProps = useMemo(() => {
      if (isFunction(mapStateToProps)) {
        return mapStateToProps(state, ownProps);
      }
      return {};
    }, [state, ownProps]);

    const dispatchToProps = useMemo(() => {
      if (!mapDispatchToProps) {
        return {};
      }
      if (isFunction(mapDispatchToProps)) {
        return mapDispatchToProps(dispatch);
      }
      return bindActionCreators(mapDispatchToProps, dispatch);
    }, [dispatch]);

    const mergedProps = useMemo(
      () => handleMergeProps(stateToProps, dispatchToProps, ownProps),
      [ownProps, stateToProps, dispatchToProps],
    );

    return <PureComponent {...mergedProps} dispatch={dispatch} />;
  };
};

export default connect;
