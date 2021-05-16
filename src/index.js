import './types';

import {
  ContextConsumer,
  ContextProvider,
  MemoizedContextProvider,
  storeFactory,
} from './provider';

import connect from './connect';

import {
  actionTypes,
  bindActionCreators,
  combineReducers,
  defaultInitializer,
  defaultReducer,
  getDerivedStateFromProps,
  getRandomInt,
  isFunction,
  shallowEquals,
} from './utils';

import {
  useDispatch,
  useLazyMemo,
  usePreviousValue,
  useSelector,
} from './hooks';

const component = {
  ContextConsumer,
  ContextProvider,
  MemoizedContextProvider,
  storeFactory,
  connect,
  actionTypes,
  bindActionCreators,
  combineReducers,
  defaultInitializer,
  defaultReducer,
  getDerivedStateFromProps,
  getRandomInt,
  isFunction,
  shallowEquals,
  useDispatch,
  useLazyMemo,
  usePreviousValue,
  useSelector,
};

export default component;
