import React, { useReducer } from 'react';
import { setObjectStateReducer } from '../reducers';
import { StatePropviderProps } from 'types';
import { defaultInitializer, getRandomInt } from 'utils';

const defaultProps: Partial<StatePropviderProps> = {
  name: getRandomInt(1, 1000),
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
    <SetStateContext.Provider value={setState} displayName={StateContext.displayName || `SetStateContext-${name}`}>
      <StateContext.Provider value={state} displayName={SetStateContext.displayName || `StateContext-${name}`}>
        {children}
      </StateContext.Provider>
    </SetStateContext.Provider>
  );
};

SetStateProvider.defaultProps = defaultProps;

export default SetStateProvider;
