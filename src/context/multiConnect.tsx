import { ComponentPropsType, MultiConnectType, ReducerStateType, ContextType } from 'types';
import React, { memo, useMemo, useContext } from 'react';
import { isFunction, shallowEquals } from 'utils';

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

const multiConnect: MultiConnectType =
  ({
    mapStateToProps,
    mapDispatchToProps,
    pure = true,
    mergeProps = (stateProps, dispatchProps, props) => ({
      ...props,
      ...stateProps,
      ...dispatchProps
    }),
    areMergedPropsEqual = shallowEquals
  }) =>
  (Component) => {
    // Memoize Component
    const PureComponent = pure ? memo(Component, areMergedPropsEqual) : Component;

    // Component props recieved from an HOC / parent
    return (ownProps) => {
      const stateToProps: ComponentPropsType = useMemo(() => {
        if (!mapStateToProps) return {};
        // Combine multiple context states and pass it as props

        return mapStateToProps.reduce((acc, item) => {
          const { context, mapStateToProps: itemMapStateToProps } = item;
          const contextState: ReducerStateType = useContext(context);
          const props: ComponentPropsType = isFunction(itemMapStateToProps)
            ? itemMapStateToProps(contextState, ownProps)
            : {};
          const newProps = { ...acc, ...props };
          return newProps;
        }, {});
      }, [ownProps]);

      const dispatchToProps: ComponentPropsType = useMemo(() => {
        if (!mapDispatchToProps) return {};

        // If you want to combine multiple dispatch APIS and pass it as props
        return Object.entries(mapDispatchToProps).reduce(
          (acc: ComponentPropsType, [propKey, context]: [string, ContextType]) => {
            const dispatch = useContext(context);
            acc[propKey] = dispatch;
            return acc;
          },
          {}
        );
      }, []);

      // The final merge of props
      const mergedProps: ComponentPropsType = useMemo(
        () => mergeProps(stateToProps, dispatchToProps, ownProps),
        [ownProps, stateToProps, dispatchToProps]
      );

      return <PureComponent {...mergedProps} />;
    };
  };

export default multiConnect;
