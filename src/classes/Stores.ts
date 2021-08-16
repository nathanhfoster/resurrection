import Store from './Store';
import { StateContextConsumer, DispatchContextConsumer, } from '@provider';
import { DispatchType, ReducerStateType, StoreNameOrContextType, StoresInterface, ThunkActionType } from '@types';

/**
 * Holds multiple store objects
 */
class Stores implements StoresInterface {
  constructor(stores?: Store[]) {
    if (
      typeof stores === 'object' &&
      Object.entries(stores)?.every(([key, store]) => store instanceof Store && key === store.getId())
    ) {
      this.stores = stores;
    }
  }

  // @ts-ignore
  stores = {};

  // @ts-ignore
  getStores = () => this.stores;

  getStore = (nameOrContext: StoreNameOrContextType = StateContextConsumer) => {
    // @ts-ignore
    const storeFoundByName = this.stores[nameOrContext];

    if (storeFoundByName?.getId() === nameOrContext) {
      return storeFoundByName;
    }

    const storeFoundByContext = Object.values(this.stores).find(
      // @ts-ignore
      (store) => store.getStateContext() === nameOrContext
    );

    // @ts-ignore
    return storeFoundByContext;
  };

  // @ts-ignore
  setStore = (store: Store) => {
    if (store instanceof Store) {
      // @ts-ignore
      this.stores[store.getId()] = store;
    }
  };

  isStoreReady = (nameOrContext: StoreNameOrContextType) => {
    const store = this.getStore(nameOrContext);
    if (store) {
      return store.getIsReady();
    }

    return false;
  };

  setStoreReady = (nameOrContext: StoreNameOrContextType, ready: boolean) => {
    const store = this.getStore(nameOrContext);
    if (store) {
      store.setIsReady(ready);
    }
  };

  setStoreState = (nameOrContext: StoreNameOrContextType, state: ReducerStateType) => {
    const store = this.getStore(nameOrContext);
    if (store) {
      store.setState(state);
    }
  };

  setStoreDispatch = (nameOrContext: StoreNameOrContextType, dispatch: DispatchType | ThunkActionType) => {
    const store = this.getStore(nameOrContext);
    if (store) {
      store.setDispatch(dispatch);
    }
  };
}

export default Stores;
