import React from 'react';
import { ContextProvider } from 'resurrection';
import { ChildComponent1, ChildComponent2 } from './components';

export const DEFAULT_STATE = {
  someKeyFromMyStore: 'Hello World'
};

const someReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SOME_ACTION_TYPE':
      return { ...state, someKeyFromMyStore: payload };

    default:
      return state;
  }
};

const Reducers = { someReducer };

const InitialState = { someReducer: DEFAULT_STATE };

const App = () => {
  /* reducers can be a single reducer function or an object of reducers */
  /* object of reducers example: const reducers = { someReducer, someOtherReducer} */
  return (
    <ContextProvider name='App' reducers={Reducers} initialState={InitialState}>
      <ChildComponent1 />
      <ChildComponent2 />
    </ContextProvider>
  );
};

export default App;
