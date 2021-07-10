import Store from './Store';
import { Dispatch, ReducerState, StoreNameOrContext, StoresInterface } from '../types';

/**
 * Holds multiple store objects
 */
class Stores implements StoresInterface {
  constructor(stores: Store[]) {
    if (
      typeof stores === 'object'
      && Object.entries(stores)?.every(
        ([key, store]) => store instanceof Store && key === store.getId(),
      )
    ) {
      this.stores = stores;
    }
  }

  //@ts-ignore
  stores = {};

  //@ts-ignore
  getStores = () => this.stores;

  getStore = (nameOrContext: StoreNameOrContext) => {
    //@ts-ignore
    const storeFoundByName = this.stores[nameOrContext];

    if (storeFoundByName?.getId() === nameOrContext) {
      return storeFoundByName;
    }

    const storeFoundByContext = Object.values(this.stores).find(
      //@ts-ignore
      store => store.getContext() === nameOrContext,
    );

    //@ts-ignore
    return storeFoundByContext;
  };

  //@ts-ignore
  setStore = (store: Store) => {
    if (store instanceof Store) {
      //@ts-ignore
      this.stores[store.getId()] = store;
    }
  };

  isStoreReady = (nameOrContext: StoreNameOrContext) => {
    const store = this.getStore(nameOrContext);
    if (store) {
      return store.getIsReady();
    }

    return false;
  };

  setStoreReady = (nameOrContext: StoreNameOrContext, ready: boolean) => {
    const store = this.getStore(nameOrContext);
    if (store) {
      store.setIsReady(ready);
    }
  };

  setStoreState = (nameOrContext: StoreNameOrContext, state: ReducerState) => {
    const store = this.getStore(nameOrContext);
    if (store) {
      store.setState(state);
    }
  };


  setStoreDispatch = (nameOrContext: StoreNameOrContext, dispatch: Dispatch) => {
    const store = this.getStore(nameOrContext);
    if (store) {
      store.setDispatch(dispatch);
    }
  };
}

export default Stores;
