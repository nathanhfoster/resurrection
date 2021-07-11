import React, { memo, useContext, useMemo } from 'react';
import {
  isFunction,
  defaultMergeProps,
  bindActionCreators,
  shallowEquals
} from './utils';
import { ContextConsumer } from './provider';
import {
  ConnectType,
  ContextStore,
  ComponentPropsType,
  MergePropsType
} from '@types';

/**
 * This function simulates Redux's connect API
 **/
const connect: ConnectType =
  (mapStateToProps, mapDispatchToProps, mergeProps, options) => Component => {
    const {
      context = ContextConsumer,
      pure = true,
      // TODO:
      // areStatesEqual = shallowEquals,
      // areOwnPropsEqual = shallowEquals,
      // areStatePropsEqual = shallowEquals,
      areMergedPropsEqual = shallowEquals
      // forwardRef = false,
    } = options || {};

    const handleMergeProps: MergePropsType = isFunction(mergeProps)
      ? mergeProps
      : defaultMergeProps;

    // Conditionally memoize Component
    const PureComponent =
      pure === true ? memo(Component, areMergedPropsEqual) : Component;

    return ownProps => {
      const { state, dispatch } = useContext<ContextStore>(context);
      const stateToProps: ComponentPropsType = useMemo(() => {
        if (isFunction(mapStateToProps)) {
          return mapStateToProps(state, ownProps);
        }
        return {};
      }, [state, ownProps]);

      const dispatchToProps: ComponentPropsType = useMemo(() => {
        if (!mapDispatchToProps) {
          return {};
        }
        if (isFunction(mapDispatchToProps)) {
          //@ts-ignore
          return mapDispatchToProps(dispatch);
        }
        return bindActionCreators(mapDispatchToProps, dispatch);
      }, [dispatch]);

      const mergedProps: ComponentPropsType = useMemo(
        () => handleMergeProps(stateToProps, dispatchToProps, ownProps),
        [ownProps, stateToProps, dispatchToProps]
      );

      return <PureComponent {...mergedProps} dispatch={dispatch} />;
    };
  };

export default connect;
