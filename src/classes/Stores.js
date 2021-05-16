import Store from './Store';

/**
 * Holds multiple store objects
 * @typedef {Class} Stores
 * @property {Object.<String|Number, Store>} stores - holds all the context stores
 * @property {function(nameOrContext: String|React.Context): Store} getStore - a store
 * @property {function(store: Store): void} setStore - sets a store
 * @property {function(nameOrContext: String|React.Context): Boolean} isStoreReady - is
 * the specific store ready
 * @property {function(name: String|React.Context, ready: Boolean): void} setStoreReady - sets
 * a specific store isReady
 */

/**
 * Holds multiple store objects
 */
class Stores {
  /**
   * Holds multiple store objects
   * @param {Object<String|Number, Stores>=} stores - initial stores to set
   * @returns {void} - nothing
   */
  constructor(stores) {
    if (
      typeof stores === 'object'
      && Object.entries(stores)?.every(
        ([key, store]) => store instanceof Store && key === store.getId(),
      )
    ) {
      this.stores = stores;
    }
  }

  stores = {}

  /**
   * Gets all the stores object
   * @return {Object} stores
   */
  getStores = () => this.stores

  /**
   * Gets a store object
   * @param {String|Object} nameOrContext - The name or context of a store
   * @return {Object} store
   */
  getStore = (nameOrContext) => {
    const storeFoundByName = this.stores[nameOrContext];

    if (storeFoundByName?.getId() === nameOrContext) {
      return storeFoundByName;
    }

    const storeFoundByContext = Object.values(this.stores).find(
      store => store.getContext() === nameOrContext,
    );

    return storeFoundByContext;
  }

  /**
   * Sets a store object
   * @param {String|Object} store - The store to be added to the stores object
   * @return {void}
   */
  setStore = (store) => {
    if (store instanceof Store) {
      this.stores[store.getId()] = store;
    }
  }

  /**
   * Gets a store's isReady
   * @param {String|Object} nameOrContext - The name or context of a store
   * @return {Boolean} - Is the store ready
   */
  isStoreReady = (nameOrContext) => {
    const store = this.getStore(nameOrContext);
    if (store) {
      return store.getIsReady();
    }

    return false;
  }

  /**
   * Sets a store's isReady
   * @param {String|Object} nameOrContext - The name or context of a store
   * @param {Boolean} ready - Is the store ready
   * @return {void}
   */
  setStoreReady = (nameOrContext, ready) => {
    const store = this.getStore(nameOrContext);
    if (store) {
      store.setIsReady(ready);
    }
  }

  /**
   * Sets a store's state
   * @param {String|Object} nameOrContext - The name or context of a store
   * @param {Object} state - The next state of the store
   * @return {void}
   */
    setStoreState = (nameOrContext, state) => {
      const store = this.getStore(nameOrContext);
      if (store) {
        store.setState(state);
      }
    }


    /**
   * Sets a store's state
   * @param {String|Object} nameOrContext - The name or context of a store
   * @param {Object} dispatch - The next dispatch of the store
   * @return {void}
   */
     setStoreDispatch = (nameOrContext, dispatch) => {
       const store = this.getStore(nameOrContext);
       if (store) {
         store.setDispatch(dispatch);
       }
     }
}

export default Stores;
