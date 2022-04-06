import { FunctionComponent, memo, useContext, useMemo, forwardRef as reactForwardRef } from 'react';
import { isFunction, defaultMergeProps, bindActionCreators, shallowEquals } from 'utils';
import { StateContextConsumer, DispatchContextConsumer } from './provider';
import { useMemoComponent } from 'hooks';
import {
  ConnectType,
  ComponentPropsType,
  ThunkActionDispatchType,
  DispatchType,
  ReducerStateType,
  MergePropsType
} from 'types';

/**
 * This function simulates Redux's connect API
 */
// @ts-ignore
const connect: ConnectType = (mapStateToProps, mapDispatchToProps, mergeProps, options) => {
  const wrapWithConnect = (WrappedComponent: FunctionComponent) => {
    const {
      stateContext = StateContextConsumer,
      dispatchContext = DispatchContextConsumer,
      pure = true,
      // TODO:
      // areStatesEqual = shallowEquals,
      areOwnPropsEqual = shallowEquals,
      // areStatePropsEqual = shallowEquals,
      areMergedPropsEqual = shallowEquals,
      forwardRef = false
    } = options || {};
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const displayName = `Connect(${wrappedComponentName})`;

    // @ts-ignore
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

      const handleMergeProps: MergePropsType = isFunction(mergeProps) ? mergeProps : defaultMergeProps;

      const mergedProps: ComponentPropsType = useMemo(
        () => handleMergeProps(stateContext, dispatchToProps, ownProps),
        [dispatchToProps, ownProps, stateToProps]
      );

      const renderedWrappedComponent = useMemo(() => {
        // @ts-ignore
        return <WrappedComponent {...mergedProps} ref={forwardedRef} />;
      }, [mergedProps, forwardedRef]);

      const ConnectedComponent = useMemoComponent(
        renderedWrappedComponent,
        mergedProps,
        pure ? areMergedPropsEqual : undefined
      );

      return ConnectedComponent;
    };

    const Connect = pure ? memo(ConnectFunction, areOwnPropsEqual) : ConnectFunction;
    // @ts-ignore
    Connect.WrappedComponent = WrappedComponent;
    // @ts-ignore
    Connect.displayName = ConnectFunction.displayName = displayName;

    if (forwardRef) {
      const ForwaredComponent = reactForwardRef((props, ref) => <Connect {...props} forwardedRef={ref} />);

      // @ts-ignore
      ForwaredComponent.displayName = displayName;
      // @ts-ignore
      ForwaredComponent.WrappedComponent = WrappedComponent;
      return ForwaredComponent;
    }

    return Connect;
  };

  return wrapWithConnect;
};

export default connect;
