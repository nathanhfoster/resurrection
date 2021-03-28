import React, {
  createContext,
  useCallback,
  useRef,
  useLayoutEffect,
  useMemo
} from 'react'
import {
  isFunction,
  combineReducers,
  shallowEquals,
  defaultInitializer,
  defaultReducer,
  getRandomInt
} from './utils'
import useLazyMemo from './hooks/useLazyMemo'
import useReducerWithThunk from './hooks/useReducerWithThunk'
import './types'

// const inDevelopmentMode = process.env.NODE_ENV === 'development'

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

/**
 * @typedef {Class} StoreFactory
 * @property {Object.<String|Number, Store>} stores - holds all the context stores
 * @property {function(nameOrContext: String|React.Context): Store} getStore - a store
 * @property {function(store: Store): void} setStore - sets a store
 * @property {function(nameOrContext: String|React.Context): Boolean} isStoreReady - is the specific store ready
 * @property {function(name: String|React.Context, ready: Boolean): void} setStoreReady - sets specific store isReady
 */

class StoreFactory {
  constructor() {}

  #stores = {}

  getStores = () => this.#stores

  getStore = (nameOrContext) => {
    const storeFoundByName = this.#stores[nameOrContext]

    if (storeFoundByName?.getId() === nameOrContext) {
      return storeFoundByName
    }

    const storeFoundByContext = Object.values(this.#stores).find(
      (store) => store.getContext() === nameOrContext
    )

    return storeFoundByContext
  }

  setStore = (store) => {
    if (store instanceof Store) {
      this.#stores[store.getId()] = store
    }
  }

  isStoreReady = (nameOrContext) => this.getStore(nameOrContext)?.getIsReady()

  setStoreReady = (nameOrContext, ready) => {
    this.getStore(nameOrContext)?.setIsReady(ready)
  }
}

const storeFactory = new StoreFactory()

const StateProvider = createContext(null)

/**
 * Context Store Factory that simulates Redux's createStore API
 * @param {ContexStoreProps} props - ContextStore props
 * @returns {React.ContextProvider} - a React Context with the store as it's value
 */
const ContextStore = ({
  name,
  context: Context,
  reducers,
  initialState,
  props,
  initializer,
  children
}) => {
  // call the function once to get initial state and global reducer
  const getInitialMainState = useCallback(
    () => combineReducers(reducers, initialState),
    []
  )
  const [mainState, mainReducer] = useLazyMemo(getInitialMainState)

  // setup useReducer with the returned values of the combineReducers
  const [state, dispatch] = useReducerWithThunk(
    mainReducer,
    mainState,
    initializer,
    props
  )

  // Update storeFactory object to access it outside of a component
  useLayoutEffect(() => {
    if (!storeFactory.isStoreReady(name)) {
      const newStore = new Store(name, Context, dispatch, state)
      storeFactory.setStore(newStore)
    }
    return () => {
      storeFactory.setStoreReady(name, false)
    }
  }, [state, dispatch])

  // make the context object value
  const contextStore = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state, dispatch]
  )

  // TODO: Handle a way to add the window._REACT_CONTEXT_DEVTOOL
  // const warnedAboutMissingDevToolRef = useRef(false)

  // useLayoutEffect(() => {
  //   if (
  //     // eslint-disable-next-line
  //     window?._REACT_CONTEXT_DEVTOOL &&
  //     inDevelopmentMode
  //   ) {
  //     try {
  //       window._REACT_CONTEXT_DEVTOOL({
  //         id: name,
  //         displayName: name,
  //         values: contextStore,
  //       })
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   } else if (!warnedAboutMissingDevToolRef.current && inDevelopmentMode) {
  //     warnedAboutMissingDevToolRef.current = true
  //     // eslint-disable-next-line
  //     console.info(
  //       '%cConsider installing "React Context DevTool" in order to inspect the context state: https://www.npmjs.com/package/react-context-devtool',
  //       'color:#1dbf73',
  //     )
  //   }
  // }, [contextStore])

  return <Context.Provider value={contextStore}>{children}</Context.Provider>
}

ContextStore.defaultProps = {
  name: getRandomInt(0, 1000),
  context: StateProvider,
  reducers: defaultReducer,
  initializer: defaultInitializer,
  initialState: undefined,
  props: undefined
}

const MemoizedContextProvider = React.memo(ContextStore, shallowEquals)

export {
  StateProvider as ContextConsumer,
  ContextStore as ContextProvider,
  MemoizedContextProvider,
  storeFactory
}
