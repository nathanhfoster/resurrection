import Store from './Store';

/**
 * Holds multiple store objects
 * @typedef {Class} Stores
 * @property {Object.<String|Number, Store>} stores - holds all the context stores
 * @property {function(nameOrContext: String|React.Context): Store} getStore - a store
 * @property {function(store: Store): void} setStore - sets a store
 * @property {function(nameOrContext: String|React.Context): Boolean} isStoreReady - is the specific store ready
 * @property {function(name: String|React.Context, ready: Boolean): void} setStoreReady - sets specific store isReady
 */

class Stores {
  #stores = {}

  getStores = () => this.#stores

  getStore = (nameOrContext) => {
    const storeFoundByName = this.#stores[nameOrContext];

    if (storeFoundByName?.getId() === nameOrContext) {
      return storeFoundByName;
    }

    const storeFoundByContext = Object.values(this.#stores).find(
      store => store.getContext() === nameOrContext,
    );

    return storeFoundByContext;
  }

  setStore = (store) => {
    if (store instanceof Store) {
      this.#stores[store.getId()] = store;
    }
  }

  isStoreReady = nameOrContext => this.getStore(nameOrContext)?.getIsReady()

  setStoreReady = (nameOrContext, ready) => {
    this.getStore(nameOrContext)?.setIsReady(ready);
  }
}

export default Stores;
