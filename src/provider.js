import React, { createContext, useLayoutEffect, useMemo } from "react"
import { combineReducers, shallowEquals, defaultInitializer } from "./utils"
import useReducerWithThunk from "./hooks/useReducerWithThunk"

const storeFactory = () => ({
  isReady: false,
  dispatch: () => {
    throw Error("Store is NOT ready!")
  },
  getState: () => {
    throw Error("Store is NOT ready!")
  },
})
// Use this only if you want to use a global reducer for your whole app
const store = storeFactory()

const StateProvider = createContext(null)

/**
 * @typedef {Object} ContexStoreProps
 * @property {Object} context - The last reference key to the form stored in a Redux reducer
 * @property {Function|Object} reducers - first object to compare
 * @property {Object=} initialState - the initial state of the reducer
 * @property {Object=} props - passed from an HOC that controlls the state of the store
 * @property {Function=} initializer - utility function that sets the initial state of the reducer
 * @property {React.ReactElement} children - the child components of the store
 */

/**
 * Context Store Factory that simulates Redux's createStore API
 * @param {ContexStoreProps} props - ContextStore props
 * @returns {React.ContextProvider} - a React Context with the store as it's value
 */
const ContextStore = ({
  context: Context = StateProvider,
  reducers,
  initialState,
  props,
  initializer = defaultInitializer,
  children,
}) => {
  // call the function once to get initial state and global reducer
  const [mainState, mainReducer] = useMemo(
    () => combineReducers(reducers, initialState),
    []
  )

  // setup useReducer with the returned values of the combineReducers
  const [state, dispatch] = useReducerWithThunk(
    mainReducer,
    mainState,
    initializer,
    props
  )

  // Update store object to potentially access it outside of a component
  useLayoutEffect(() => {
    if (!store.isReady) {
      store.isReady = true
      store.dispatch = dispatch
      store.getState = () => state
      // Object.freeze(store) // don't freeze the object, or store.isReady can't be re-assigned
    }
    return () => {
      store.isReady = false
    }
  }, [state, dispatch])

  // make the context object value
  const contextStore = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  )

  return <Context.Provider value={contextStore}>{children}</Context.Provider>
}

const MemoizedContextProvider = React.memo(ContextStore, shallowEquals)

export {
  StateProvider as ContextConsumer,
  ContextStore as ContextProvider,
  MemoizedContextProvider,
  store,
}
