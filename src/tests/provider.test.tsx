import React from 'react';
import { render } from '@testing-library/react';
import { ContextProvider, storeFactory } from '..';
import {
  ContextStoreNameType,
  ReducerMap,
  ReducerStateType,
  ReducerType,
  ContextType
} from '@types';

export const DEFAULT_STATE: ReducerStateType = {
  someKeyFromMyStore: 'Hello World'
};

export const testReducer1: ReducerType = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SOME_ACTION_TYPE_1':
      return { ...state, someKeyFromMyStore: payload };

    default:
      return state;
  }
};

export const testReducer2: ReducerType = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SOME_ACTION_TYPE_2':
      return { ...state, someKeyFromMyStore: payload };

    default:
      return state;
  }
};

export const reducers: ReducerMap = { testReducer1, testReducer2 };

const getWrapper = (name: ContextStoreNameType, context: ContextType) => render(
  <ContextProvider name={name} context={context} reducers={reducers}>
    <span>Test</span>
  </ContextProvider>,
);

describe('provider', () => {
  beforeEach(() => { });

  describe('storeFactory', () => {
    it('Should get a store from a unique name', () => {
      const providerName = 'TEST1';
      const providerContext = React.createContext(null);
      const wrapper = getWrapper(providerName, providerContext);
      const stores = storeFactory.getStores();
      const appStore = storeFactory.getStore(providerName);
      expect(wrapper).toBeDefined();
      expect(stores).toBeDefined();
      expect(appStore).toBeDefined();
      expect(appStore.getId()).toBe(providerName);
      expect(appStore.getContext()).toBe(providerContext);
    });

    it('Should have get a store from a context', () => {
      const providerName = 'TEST2';
      const providerContext = React.createContext(null);
      const wrapper = getWrapper(providerName, providerContext);
      const stores = storeFactory.getStores();
      const appStore = storeFactory.getStore(providerContext);
      expect(wrapper).toBeDefined();
      expect(stores).toBeDefined();
      expect(stores.TEST1).toBeDefined();
      expect(appStore).toBeDefined();
      expect(appStore.getId()).toBe(providerName);
    });
  });
});
