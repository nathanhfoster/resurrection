import React, { createContext, useRef, useLayoutEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { combineReducers, shallowEquals, defaultInitializer, getRandomInt } from './utils'
import useLazyMemo from './hooks/useLazyMemo'
import useReducerWithThunk from './hooks/useReducerWithThunk'
import './types'

const inDevelopmentMode = process.env.NODE_ENV === 'development'

const storeFactory = () => ({
  isReady: false,
  dispatch: () => {
    throw Error('Store is NOT ready!')
  },
  getState: () => {
    throw Error('Store is NOT ready!')
  },
})
// Use this only if you want to use a global reducer for your whole app
const store = storeFactory()

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
  children,
}) => {
  // call the function once to get initial state and global reducer
  const [mainState, mainReducer] = useLazyMemo(() => combineReducers(reducers, initialState))

  // setup useReducer with the returned values of the combineReducers
  const [state, dispatch] = useReducerWithThunk(mainReducer, mainState, initializer, props)

  // eslint-disable-next-line react-hooks/rules-of-hooks

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
    [state, dispatch],
  )

  const warnedAboutMissingDevToolRef = useRef(false)

  useLayoutEffect(() => {
    if (
      typeof window !== 'undefined' &&
      // eslint-disable-next-line
      window._REACT_CONTEXT_DEVTOOL &&
      inDevelopmentMode
    ) {
      // eslint-disable-next-line
      window._REACT_CONTEXT_DEVTOOL({ id: name, displayName: name, values: contextStore })
    } else if (!warnedAboutMissingDevToolRef.current && inDevelopmentMode) {
      warnedAboutMissingDevToolRef.current = true
      // eslint-disable-next-line
      console.info(
        '%cConsider installing "React Context DevTool" in order to inspect the Wisteria state',
        'color:#1dbf73',
      )
    }
  }, [contextStore])

  return <Context.Provider value={contextStore}>{children}</Context.Provider>
}

ContextStore.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  context: PropTypes.shape({}),
  reducers: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.func)]).isRequired,
  initialState: PropTypes.shape({}),
  props: PropTypes.shape({}),
  initializer: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
    PropTypes.func,
    PropTypes.symbol,
    PropTypes.object,
    PropTypes.elementType,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.arrayOf(PropTypes.func),
    PropTypes.arrayOf(PropTypes.symbol),
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.elementType),
  ]).isRequired,
}

ContextStore.defaultProps = {
  name: getRandomInt(0, 1000),
  context: StateProvider,
  initializer: defaultInitializer,
  initialState: undefined,
  props: undefined,
}

const MemoizedContextProvider = React.memo(ContextStore, shallowEquals)

export {
  StateProvider as ContextConsumer,
  ContextStore as ContextProvider,
  MemoizedContextProvider,
  store,
}
