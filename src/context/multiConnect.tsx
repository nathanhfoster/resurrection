import { MultiConnectType, ReducerStateType } from '@types';
import React, { memo, useMemo, SetStateAction, useContext } from 'react';
import { isFunction, shallowEquals } from '@utils';

/**
 * Connects a Component to one or more context stores
 * @typedef {object} ConnectOptions
 * @property {function(object.<string, *>, object.<string, *>): object.<string, *>=} mapStateToProps - A callback used when there is only one stateContext
 * @property {React.context|object=} stateContext - The context that holds an object stateContext
 * @property {React.context|object=} dispatchContext - The conext that holds a reducers dispatch API
 * @property {Boolean=} pure - when options.pure is true,
 * connect performs several equality checks that are used to avoid unnecessary calls to
 * mapStateToProps,
 * mapDispatchToProps,
 * mergeProps,
 * and ultimately to render.
 * While the defaults are probably appropriate 99% of the time,
 * you may wish to override them with custom implementations for performance or other reasons.
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

const multiConnect: MultiConnectType = ({
  mapStateToProps,
  stateContext,
  dispatchContext,
  pure = true,
  mergeProps = (stateProps, dispatchProps, props) => ({
    ...props,
    ...stateProps,
    ...dispatchProps,
  }),
  areMergedPropsEqual = shallowEquals,
}) => (Component) => {
  // Memoize Component
  const PureComponent = pure ? memo(Component, areMergedPropsEqual) : Component;

  // Component props recieved from an HOC / parent
  return (ownProps) => {
    const stateToProps: ReducerStateType = useMemo(() => {
      // If you want to combine multiple context states and pass it as props
      if (Array.isArray(stateContext)) {
        return stateContext.reduce((acc, item) => {
          const { context, mapStateToProps: itemMapStateToProps } = item;
          const contextState = useContext(context);
          const props = isFunction(itemMapStateToProps) ? itemMapStateToProps(contextState, ownProps) : {};
          const newProps = { ...acc, ...props };
          return newProps;
        }, {});
      }

      // If you just want to one context state
      if (isFunction(mapStateToProps)) {
        const state = useContext(stateContext);
        return mapStateToProps(state, ownProps);
      }

      return {};
    }, [ownProps]);

    const dispatchToProps = useMemo(() => {
      if (!dispatchContext) return {};

      // If you want to combine multiple dispatch APIS and pass it as props
      if (typeof dispatchContext === 'object' && !dispatchContext.$$typeof) {
        return Object.entries(dispatchContext).reduce((acc, [propKey, context]) => {
          const dispatch = useContext(context);
          acc[propKey] = dispatch;
          return acc;
        }, {});
      }

      // Default to one dispatch API being passed with the propKey 'dispatch'
      return { dispatch: useContext(dispatchContext) };
    }, []);

    // The final merge of props
    const mergedProps = useMemo(() => mergeProps(stateToProps, dispatchToProps, ownProps), [
      ownProps,
      stateToProps,
      dispatchToProps,
    ]);

    return <PureComponent {...mergedProps} />;
  };
};

export default multiConnect;
