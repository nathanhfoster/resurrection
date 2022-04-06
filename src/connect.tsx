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
const connect: ConnectType = (mapStateToProps, mapDispatchToProps, mergeProps, options) => {
  const wrapWithConnect = (WrappedComponent) => {
    const {
      stateContext = StateContextConsumer,
      dispatchContext = DispatchContextConsumer,
      pure = true,
      // TODO:
      // areStatesEqual = shallowEquals,
      // areOwnPropsEqual = shallowEquals,
      // areStatePropsEqual = shallowEquals,
      areMergedPropsEqual = shallowEquals,
      forwardRef = false,
    } = options || {};

    const handleMergeProps: MergePropsType = isFunction(mergeProps) ? mergeProps : defaultMergeProps;

    // Conditionally memoize WrappedComponent
    const PureComponent = pure === true ? memo(WrappedComponent, areMergedPropsEqual) : WrappedComponent;

    const ConnectFunction = ({ forwardedRef, ...ownProps }) => {
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
          return { dispatch };
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

      const renderedWrappedComponent = useMemo(() => {
        const PureComponent = pure ? memo(WrappedComponent, areMergedPropsEqual) : WrappedComponent;

        return <PureComponent {...mergedProps} ref={forwardedRef} />;
      }, [forwardedRef, mergedProps]);

      return renderedWrappedComponent;
    };

    const Connect = pure ? memo(ConnectFunction, areMergedPropsEqual) : ConnectFunction;

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;

    if (forwardRef) {
      const ForwaredComponent = reactForwardRef((props, ref) => <Connect {...props} forwardedRef={ref} />);

      ForwaredComponent.displayName = displayName;
      ForwaredComponent.WrappedComponent = WrappedComponent;
      return ForwaredComponent;
    }

    return Connect;
  }

  return wrapWithConnect
};

export default connect;
