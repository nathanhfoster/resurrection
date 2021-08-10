import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { setObjectStateReducer } from '../reducers';
import { StatePropviderProps } from '@types';
import { defaultInitializer, getRandomInt } from '@utils';

const defaultProps: Partial<StatePropviderProps> = {
  name: getRandomInt(0, 1000),
  reducer: setObjectStateReducer,
  initialState: {},
  initializer: defaultInitializer
};

const SetStateProvider: React.FC<StatePropviderProps> = ({
  name,
  StateContext,
  reducer,
  initialState,
  initializer,
  SetStateContext,
  children
}) => {
  // @ts-ignore
  const [state, setState] = useReducer(reducer, initialState, initializer);

  return (
    <SetStateContext.Provider value={setState} displayName={`SetStateContext-${name}`}>
      <StateContext.Provider value={state} displayName={`StateContext-${name}`}>{children}</StateContext.Provider>
    </SetStateContext.Provider>
  );
};

SetStateProvider.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  StateContext: PropTypes.object.isRequired,
  reducer: PropTypes.func,
  initialState: PropTypes.object.isRequired,
  initializer: PropTypes.func,
  SetStateContext: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

SetStateProvider.defaultProps = defaultProps;

export default SetStateProvider;
