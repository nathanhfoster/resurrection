import React from 'react'
import { ContextProvider } from 'resurrection'
import SomeProviderChild from './SomeProviderChild'

export const DEFAULT_STATE = {
  someKeyFromMyStore: 'Hello World'
}

const someReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SOME_ACTION_TYPE':
      return { ...state, someKeyFromMyStore: payload }

    default:
      return state
  }
}

const SomeProvider = () => (
  /* reducers can be a single reducer function or an object of reducers */
  /* object of reducers example: const reducers = { someReducer, someOtherReducer} */
  <ContextProvider name='App' reducers={someReducer} initialState={DEFAULT_STATE}>
    <SomeProviderChild />
  </ContextProvider>
)

export default SomeProvider
