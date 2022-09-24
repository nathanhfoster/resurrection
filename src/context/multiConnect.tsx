import {
  ComponentPropsType,
  MultiConnectType,
  ReducerStateType,
  DispatchType,
  ThunkActionDispatchMap,
  ThunkActionDispatchType
} from 'types';
import { memo, useContext, forwardRef as reactForwardRef, FunctionComponent, useRef } from 'react';
import { defaultMergeProps, isFunction, isValidContext, shallowEquals } from 'utils';
import { bindActionCreator } from 'utils/bindActionCreators';
import { useMemoComponent } from 'hooks';

/**
 * Connects a Component to one or more context stores
 * @typedef {object} ConnectOptions
 * @property {function(object.<string, *>, object.<string, *>): object.<string, *>=} mapStateToProps - A callback used when there is only one stateContext
 * @property {React.conext|obect.<string, React.context>} mapDispatchToProps - The conext that holds a reducers dispatch API
 * @property {Boolean=} pure - when options.pure is true,
 * multiConnect performs several equality checks that are used to avoid unnecessary calls to
 * mapStateToProps,
 * mapDispatchToProps,
 * mergeProps,
 * and ultimately to render.
 * While the defaults are probably appropriate 99% of the time,
 * you may wish to override them with custom implementations for performance or other reasons.
 * @property {function(stateToProps, dispatchToProps, ownProps) => object.<string, *>} mergeProps - The final merge of all props
 * @property {Function=} areMergedPropsEqual - when pure, compares the result of mergeProps
 * to its previous value.
 * areMergedPropsEqual: (next: Object, prev: Object) => boolean
 * */

/**
 * This HOC connects a component to a context state object
 * and passes in props specified by the mapStateToProps callback
 * from the Component that maps certain <key, values> from the stateContext and passes them as props to the Component
 * @param {ConnectOptions}
 * @returns {React.memo} - A pure component with the following props:
 * The reducer dispatch API from the dispatchContext
 * The state returned from passing the stateContext into the mapStateToProps callback
 * The Components ownProps recieved from an HOC parent
 */

// @ts-ignore
const multiConnect: MultiConnectType = ({
  mapStateToProps,
  mapDispatchToProps,
  pure = true,
  mergeProps = defaultMergeProps,
  areOwnPropsEqual = shallowEquals,
  areMergedPropsEqual = shallowEquals,
  forwardRef = false
}) => {
  const shouldMemoizeWrappedComponent = useRef(pure)
  const wrapWithConnect = (WrappedComponent: FunctionComponent) => {
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const displayName = `Connect(${wrappedComponentName})`;

    const ConnectFunction: React.FC<{ forwardedRef: any }> = ({ forwardedRef, ...ownProps }) => {
      shouldMemoizeWrappedComponent.current = Boolean(shouldMemoizeWrappedComponent && ownProps.children)
      const stateToProps = mapStateToProps.reduce((acc, item) => {
        const { context, mapStateToProps: itemMapStateToProps } = item;
        const contextState = useContext<ReducerStateType>(context);
        const props: ComponentPropsType = isFunction(itemMapStateToProps)
          ? itemMapStateToProps(contextState, ownProps)
          : {};
        const newProps = { ...acc, ...props };
        return newProps;
      }, {});

      const dispatchToProps = Array.isArray(mapDispatchToProps)
        ? mapDispatchToProps.reduce((acc, curr) => {
            const dispatch = useContext<DispatchType>(curr.context);
            Object.entries(curr.mapDispatchToProps).forEach(([key, value]) => {
              acc[key] = bindActionCreator(dispatch)(value);
            });
            return acc;
          }, {})
        : Object.entries(mapDispatchToProps).reduce((acc: ThunkActionDispatchMap, [key, value]) => {
            if (isValidContext(value)) {
              const dispatch = useContext<ThunkActionDispatchType>(value);
              acc[key] = dispatch;
            }
            return acc;
          }, {});

      const ConnectedComponent = useMemoComponent({
        Component: WrappedComponent,
        props: mergeProps(stateToProps, dispatchToProps, ownProps),
        ref: forwardedRef,
        isEqual: shouldMemoizeWrappedComponent.current ? areMergedPropsEqual : undefined
      });

      return ConnectedComponent;
    };

    if (forwardRef) {
      const ForwaredComponent = reactForwardRef((props, ref) => <Connect {...props} forwardedRef={ref} />);

      ForwaredComponent.displayName = displayName;
      // @ts-ignore
      ForwaredComponent.WrappedComponent = WrappedComponent;
      return ForwaredComponent;
    }

    const Connect = shouldMemoizeWrappedComponent.current ? memo(ConnectFunction, areOwnPropsEqual) : ConnectFunction;
    // @ts-ignore
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;

    return Connect;
  };

  return wrapWithConnect;
};

export default multiConnect;
