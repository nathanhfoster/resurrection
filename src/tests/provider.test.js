import React from 'react'
import { render } from '@testing-library/react'
import { ContextProvider, storeFactory } from '../'

const DEFAULT_STATE = {
  someKeyFromMyStore: 'Hello World'
}

const testReducer1 = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SOME_ACTION_TYPE_1':
      return { ...state, someKeyFromMyStore: payload }

    default:
      return state
  }
}

const testReducer2 = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SOME_ACTION_TYPE_2':
      return { ...state, someKeyFromMyStore: payload }

    default:
      return state
  }
}

const reducers = { testReducer1, testReducer2 }

const getWrapper = (name, context) =>
  render(
    <ContextProvider name={name} context={context} reducers={reducers}>
      <span>Test</span>
    </ContextProvider>
  )

describe('provider', () => {
  beforeEach(() => {})

  describe('storeFactory', () => {
    it(`should get a store from a unique name`, () => {
      const providerName = 'TEST1'
      const providerContext = React.createContext(null)
      const wrapper = getWrapper(providerName, providerContext)
      const stores = storeFactory.getStores()
      const appStore = storeFactory.getStore(providerName)
      expect(wrapper).toBeDefined()
      expect(stores).toBeDefined()
      expect(appStore).toBeDefined()
      expect(appStore.getId()).toBe(providerName)
      expect(appStore.getContext()).toBe(providerContext)
    })

    it(`should have get a store from a context`, () => {
      const providerName = 'TEST2'
      const providerContext = React.createContext(null)
      const wrapper = getWrapper(providerName, providerContext)
      const stores = storeFactory.getStores()
      const appStore = storeFactory.getStore(providerContext)
      expect(wrapper).toBeDefined()
      expect(stores).toBeDefined()
      expect(stores['TEST1']).toBeDefined()
      expect(appStore).toBeDefined()
      expect(appStore.getId()).toBe(providerName)
    })
  })
})
