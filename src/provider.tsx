import React, { createContext, useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { combineReducers, shallowEquals, defaultInitializer, getRandomInt } from '@utils';
import { Stores, Store } from './classes';
import useLazyMemo from '@hooks/useLazyMemo';
import useReducerWithThunk from '@hooks/useReducerWithThunk';
import { ContextStoreProps } from '@types';
import { setStateReducer } from '@reducers';

// const inDevelopmentMode = process.env.NODE_ENV === 'development'

const storeFactory = new Stores();

const DispatchProvider = createContext(null);
const StateProvider = createContext(null);

const defaultProps: Partial<ContextStoreProps> = {
  name: getRandomInt(0, 1000),
  stateContext: StateProvider,
  dispatchContext: DispatchProvider,
  reducers: setStateReducer,
  initializer: defaultInitializer,
  initialState: undefined,
  props: undefined
};

/**
 * Context Store Factory that simulates Redux's createStore API
 */
const ContextStore: React.FC<ContextStoreProps> = ({
  name,
  stateContext: StateContext,
  dispatchContext: DispatchContext,
  reducers,
  initialState,
  props,
  initializer,
  children
}) => {
  // call the function once to get initial state and global reducer
  const getInitialMainState = useCallback(() => combineReducers(reducers, initialState), []);
  const [mainState, mainReducer] = useLazyMemo(getInitialMainState);

  // setup useReducer with the returned values of the combineReducers
  const [state, dispatch] = useReducerWithThunk(mainReducer, mainState, initializer, props);

  // Update storeFactory object to access it outside of a component
  useLayoutEffect(() => {
    if (!storeFactory.isStoreReady(name)) {
      const newStore = new Store(name, StateContext, dispatch, state);
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

ContextStore.propTypes = {
  name: PropTypes.string,
  stateContext: PropTypes.shape({}),
  dispatchContext: PropTypes.shape({}),
  // @ts-ignore
  reducers: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.func)]),
  initialState: PropTypes.shape({}),
  props: PropTypes.shape({}),
  initializer: PropTypes.func,
  children: PropTypes.oneOfType([
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
    PropTypes.arrayOf(PropTypes.elementType)
  ]).isRequired
};

ContextStore.defaultProps = defaultProps;

const MemoizedContextProvider = React.memo(ContextStore, shallowEquals);

export {
  StateProvider as StateContextConsumer,
  DispatchProvider as DispatchContextConsumer,
  ContextStore as ContextProvider,
  MemoizedContextProvider,
  storeFactory
};
