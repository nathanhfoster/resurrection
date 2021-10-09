import { memo, useContext, useMemo } from 'react';
import { isFunction, defaultMergeProps, bindActionCreators, shallowEquals } from 'utils';
import { StateContextConsumer, DispatchContextConsumer } from './provider';
import {
  ConnectType,
  ComponentPropsType,
  MergePropsType,
  ThunkActionDispatchType,
  DispatchType,
  ReducerStateType
} from 'types';

/**
 * This function simulates Redux's connect API
 */
const connect: ConnectType = (mapStateToProps, mapDispatchToProps, mergeProps, options) => (Component) => {
  const {
    stateContext = StateContextConsumer,
    dispatchContext = DispatchContextConsumer,
    pure = true,
    // TODO:
    // areStatesEqual = shallowEquals,
    // areOwnPropsEqual = shallowEquals,
    // areStatePropsEqual = shallowEquals,
    areMergedPropsEqual = shallowEquals
    // forwardRef = false,
  } = options || {};

  const handleMergeProps: MergePropsType = isFunction(mergeProps) ? mergeProps : defaultMergeProps;

  // Conditionally memoize Component
  const PureComponent = pure === true ? memo(Component, areMergedPropsEqual) : Component;

  return (ownProps) => {
    const state: ReducerStateType = useContext<ReducerStateType>(stateContext);
    const dispatch: DispatchType = useContext<DispatchType>(dispatchContext);

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
        return mapDispatchToProps(dispatch as ThunkActionDispatchType);
      }
      return bindActionCreators(mapDispatchToProps, dispatch);
    }, [dispatch]);

    const mergedProps: ComponentPropsType = useMemo(
      () => handleMergeProps(stateToProps, dispatchToProps, ownProps),
      [ownProps, stateToProps, dispatchToProps]
    );

    return <PureComponent {...mergedProps} />;
  };
};

export default connect;
