import {
  ComponentPropsType,
  ReducerStateType,
  SetStateConnectType
} from '@types';
import React, { memo, useContext } from 'react';
import { isFunction, shallowEquals } from '@utils';

/**
 * This HOC connects a component to a context state object
 * and passes in props specified by the mapStateToProps callback
 * */

const stateConnect: SetStateConnectType =
  (stateContext, setStateContext, mapStateToProps, isEqual = shallowEquals) =>
    Component => {
      // Memoize Component
      const PureComponent = memo(Component, isEqual);

      return ownProps => {
        const state = useContext<ReducerStateType>(stateContext);
        const setState = useContext(setStateContext);

        const stateToProps: ComponentPropsType =
          isFunction(mapStateToProps) ?
            mapStateToProps(state, ownProps) : {};

        return (
          <PureComponent
            {...stateToProps}
            {...ownProps}
            setState={setState}
          />
        );
      };
    };

export default stateConnect;
