import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { setObjectStateReducer } from '../reducers';
import { StatePropviderProps } from '@types';
import { defaultInitializer } from '@utils';

const defaultProps: Partial<StatePropviderProps> = {
  reducer: setObjectStateReducer,
  initialState: {},
  initializer: defaultInitializer
};

const SetStateProvider: React.FC<StatePropviderProps> = ({
  StateContext,
  reducer,
  initialState,
  initializer,
  SetStateContext,
  children
}) => {
  //@ts-ignore
  const [state, setState] = useReducer(reducer, initialState, initializer);

  return (
    <SetStateContext.Provider value={setState}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </SetStateContext.Provider>
  );
};

SetStateProvider.propTypes = {
  StateContext: PropTypes.object.isRequired,
  reducer: PropTypes.func,
  initialState: PropTypes.object.isRequired,
  initializer: PropTypes.func,
  SetStateContext: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

SetStateProvider.defaultProps = defaultProps;

export default SetStateProvider;
