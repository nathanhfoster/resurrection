import React, { createContext, useCallback, useLayoutEffect } from 'react';
import { combineReducers, shallowEquals, defaultInitializer, getRandomInt } from 'utils';
import { Stores, Store } from './classes';
import useLazyMemo from 'hooks/useLazyMemo';
import useReducerWithThunk from 'hooks/useReducerWithThunk';
import type { ContextStoreProps } from 'types';
import { setStateReducer } from 'reducers';

// const inDevelopmentMode = process.env.NODE_ENV === 'development'

const storeFactory = new Stores();

const StateProvider = createContext(null);
const DispatchProvider = createContext(null);

/**
 * Context Store Factory that simulates Redux's createStore API
 */
const ContextStore: React.FC<ContextStoreProps> = ({
  name,
  stateContext: StateContext,
  dispatchContext: DispatchContext,
  reducers,
  initialState = StateContext?._currentValue,
  derivedStateFromProps,
  initializer,
  children
}) => {
  // call the function once to get initial state and global reducer
  const getInitialMainState = useCallback(() => combineReducers(reducers, initialState), []);
  const [mainState, mainReducer] = useLazyMemo(getInitialMainState);

  // setup useReducer with the returned values of the combineReducers
  const [state, dispatch] = useReducerWithThunk(mainReducer, mainState, initializer, derivedStateFromProps);

  // Update storeFactory object to access it outside of a component
  useLayoutEffect(() => {
    if (!storeFactory.isStoreReady(name)) {
      const newStore = new Store(name as string, StateContext, state, DispatchContext, dispatch);
      storeFactory.setStore(newStore);
    } else {
      storeFactory.setStoreState(name, state);
      storeFactory.setStoreDispatch(name, dispatch);
    }
    return () => {
      storeFactory.setStoreReady(name, false);
    };
  }, [state, dispatch]);

  return (
    <DispatchContext.Provider value={dispatch} displayName={DispatchContext.displayName || `${name}-DispatchContext`}>
      <StateContext.Provider value={state} displayName={StateContext.displayName || `${name}-StateContext`}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

ContextStore.defaultProps = {
  name: getRandomInt(1, 1000),
  stateContext: StateProvider,
  dispatchContext: DispatchProvider,
  reducers: setStateReducer,
  initializer: defaultInitializer,
  initialState: undefined,
  derivedStateFromProps: undefined
};

const MemoizedContextProvider = React.memo(ContextStore, shallowEquals);

export {
  StateProvider as StateContextConsumer,
  DispatchProvider as DispatchContextConsumer,
  ContextStore as ContextProvider,
  MemoizedContextProvider,
  storeFactory
};
