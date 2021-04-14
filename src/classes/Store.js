import isFunction from '../utils/isFunction'
import { getRandomInt } from '../utils'

/**
 * Holds the properties of a store object
 * @typedef {Class} Store
 * @property {String|Number} id - unique id of the store
 * @property {React.Context} context - store context
 * @property {Boolean} isReady - is the store ready
 * @property {function(store: Store): Thunk} dispatch - store thunk
 * @property {function(): ReducerState} getState - returns store state
 * @property {function(ready: Boolean): void} setIsReady - sets the store isReady
 * @returns {void} - nothing
 */

/**
 * Holds the properties of a store object
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
    this.#id = id || getRandomInt(0, 1000)

    this.#context = context

    if (isFunction(dispatch)) {
      this.dispatch = dispatch
    }

    this.#state = state

    this.#isReady = !!(id && dispatch && state)
  }

  #id = null

  #context = null

  #state = {}

  #isReady = false

  /**
   * Store's dispatch API
   * @returns {void}
   */
  dispatch = () => {
    throw Error('Store is NOT ready!')
  }

  /**
   * Get store's id
   * @returns {String|Number} #id - unique id of the store
   */
  getId = () => this.#id

  /**
   * Get store's context
   * @returns {Object} #context - The store's context
   */
  getContext = () => this.#context

  /**
   * Get store's context
   * @returns {Object} #state - The store's state
   */
  getState = () => {
    if (!this.#isReady) {
      throw Error('Store is NOT ready!')
    }

    return this.#state
  }

  /**
   * Get store's isReady
   * @returns {Boolean} #isReady - The store's isReady
   */
  getIsReady = () => this.#isReady

  /**
   * Sets store's isReady
   * @param {Boolean} ready - Is the store ready
   * @returns {void}
   */
  setIsReady = (ready) => {
    this.#isReady = ready
  }

  /**
   * Sets store's state
   * @param {Object} state - Next state for the store
   * @returns {void}
   */
  setState = (state) => {
    this.#state = state
  }

  /**
   * Sets store's dispatch
   * @param {Object} dispatch - Next dispatch for the store
   * @returns {void}
   */
  setDispatch = (dispatch) => {
    this.dispatch = dispatch
  }
}

export default Store
