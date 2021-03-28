import isFunction from '../utils/isFunction'
/**
 * @typedef {Class} Store
 * @property {String|Number} id - unique id of the store
 * @property {React.Context} - store context
 * @property {Boolean} isReady - is the store ready
 * @property {function(store: Store): Thunk} dispatch - store thunk
 * @property {function(): ReducerState} getState - returns store state
 * @property {function(ready: Boolean): void} setIsReady - sets the store isReady
 */

class Store {
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

  dispatch = () => {
    throw Error('Store is NOT ready!')
  }

  getId = () => this.#id

  getContext = () => this.#context

  getState = () => {
    if (!this.#isReady) {
      throw Error('Store is NOT ready!')
    }

    return this.#state
  }

  getIsReady = () => this.#isReady

  setIsReady = (ready) => {
    this.#isReady = ready
  }
}

export default Store
