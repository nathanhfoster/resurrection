import React from 'react';
import { ContextProvider } from 'resurrection';
import ChildComponent from './components';

export const DEFAULT_STATE = {
  someKeyFromMyStore: 'Hello World!'
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

const App = () => {
  /* reducers can be a single reducer function or an object of reducers */
  /* object of reducers example: const reducers = { someReducer, someOtherReducer} */
  return (
    <ContextProvider name='App' reducers={someReducer} initialState={DEFAULT_STATE}>
      <ChildComponent />
    </ContextProvider>
  );
};

export default App;
