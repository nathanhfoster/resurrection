import { ReducerStateType } from 'types';
import { createContext } from 'react';
import { Stores, Store } from '..';

describe('classes', () => {
  describe('Stores', () => {
    it('Should create a new object', () => {
      const stores = new Stores();
      expect(stores).toBeDefined();
    });
    it('Should not setStore', () => {
      const stores = new Stores();
      // @ts-ignore
      stores.setStore(new Store('key'));
      // @ts-ignore
      const store = stores.getStore();
      expect(store).toBeUndefined();
    });
    it('Should not setStoreReady', () => {
      const state = { key1: 'key1' };
      const dispatch = jest.fn();
      // @ts-ignore
      const initialStores = { key1: new Store('key1') };
      // @ts-ignore
      const stores = new Stores(initialStores);
      stores.setStoreReady('key1', true);
      stores.setStoreState('key1', state);
      stores.setStoreDispatch('key1', dispatch);
      const store = stores.getStore('key1');
      const isReady = store.getIsReady();
      const isStoreReady = stores.isStoreReady('key1');
      expect(isReady).toBe(true);
      expect(isStoreReady).toBe(true);
      expect(store.getState()).toMatchObject(state);
      expect(store.dispatch).toBeDefined();
    });
  });

  describe('Store', () => {
    it('Should create a new object with a random id and the dispatch and getState methods Should throw errors', () => {
      // @ts-ignore
      const store = new Store();
      // @ts-ignore
      expect(() => store.dispatch()).toThrowError('Store is NOT ready!');
      expect(() => store.getState()).toThrowError('Store is NOT ready!');
    });
    it('Should getState', () => {
      const initialState: ReducerStateType = { key1: 'key1' };
      // @ts-ignore
      const store = new Store(1, createContext(initialState), jest.fn(), initialState);
      const state = store.getState();
      expect(state).toMatchObject(initialState);
    });
  });
});
