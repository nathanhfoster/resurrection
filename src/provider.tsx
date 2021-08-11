import React, {
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo
} from 'react';
import PropTypes from 'prop-types';
import {
  combineReducers,
  shallowEquals,
  defaultInitializer,
  getRandomInt
} from '@utils';
import { Stores, Store } from './classes';
import useLazyMemo from '@hooks/useLazyMemo';
import useReducerWithThunk from '@hooks/useReducerWithThunk';
import { ContextStoreProps } from '@types';
import { setStateReducer } from '@reducers';

// const inDevelopmentMode = process.env.NODE_ENV === 'development'

const storeFactory = new Stores();

const StateProvider = createContext(null);

const defaultProps: Partial<ContextStoreProps> = {
  name: getRandomInt(0, 1000),
  context: StateProvider,
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
  );
  const [mainState, mainReducer] = useLazyMemo(getInitialMainState);

  // setup useReducer with the returned values of the combineReducers
  const [state, dispatch] = useReducerWithThunk(
    mainReducer,
    mainState,
    initializer,
    props
  );

  // Update storeFactory object to access it outside of a component
  useLayoutEffect(() => {
    if (!storeFactory.isStoreReady(name)) {
      const newStore = new Store(name, Context, dispatch, state);
      storeFactory.setStore(newStore);
    } else {
      storeFactory.setStoreState(name, state);
      storeFactory.setStoreDispatch(name, dispatch);
    }
    return () => {
      storeFactory.setStoreReady(name, false);
    };
  }, [state, dispatch]);

  // make the context object value
  const contextStore = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state, dispatch]
  );

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

  return <Context.Provider value={contextStore} displayName={Context.displayName || name}>{children}</Context.Provider>;
};

ContextStore.propTypes = {
  name: PropTypes.string,
  context: PropTypes.shape({}),
  // @ts-ignore
  reducers: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.func)
  ]),
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
  StateProvider as ContextConsumer,
  ContextStore as ContextProvider,
  MemoizedContextProvider,
  storeFactory
};
