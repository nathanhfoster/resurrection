import isFunction from '../utils/isFunction';
import { getRandomInt } from '../utils';

/**
 * Holds the properties of a store object
 * @typedef {Class} Store
 * @property {String|Number} id - unique id of the store
 * @property {React.Context} - store context
 * @property {Boolean} isReady - is the store ready
 * @property {function(store: Store): Thunk} dispatch - store thunk
 * @property {function(): ReducerState} getState - returns store state
 * @property {function(ready: Boolean): void} setIsReady - sets the store isReady
 * @returns {void} - nothing
 */
class Store {
/**
 * Holds the properties of a store object
 * @param {String|Number} id - unique id of the store
 * @param {React.Context} context - store's context
 * @param {function(store: Store): Thunk} dispatch - store's thunk
 * @param {ReducerState} state - store's initial state
 * @returns {void} - nothing
 */
  constructor(id, context, dispatch, state) {
    this.#id = id || getRandomInt(0, 1000);

    this.#context = context;

    if (isFunction(dispatch)) {
      this.dispatch = dispatch;
    }

    this.#state = state;

    this.#isReady = !!(id && dispatch && state);
  }

  #id = null

  #context = null

  #state = {}

  #isReady = false

  dispatch = () => {
    throw Error('Store is NOT ready!');
  }

  getId = () => this.#id

  getContext = () => this.#context

  getState = () => {
    if (!this.#isReady) {
      throw Error('Store is NOT ready!');
    }

    return this.#state;
  }

  getIsReady = () => this.#isReady

  setIsReady = (ready) => {
    this.#isReady = ready;
  }
}

export default Store;
