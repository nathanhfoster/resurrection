import { getRandomInt, isFunction } from 'utils';
import {
  StoreInterface,
  ContextType,
  DispatchType,
  ReducerStateType,
  ThunkActionType,
  ContextStoreNameType
} from 'types';

/**
 * Holds the properties of a store object
 */
class Store implements StoreInterface {
  constructor(
    id: ContextStoreNameType,
    stateContext: ContextType,
    state: ReducerStateType,
    dispatchContext: ContextType,
    dispatch: DispatchType | ThunkActionType,
  ) {
    // @ts-ignore
    this.id = id || getRandomInt(1, 1000);

    // @ts-ignore
    this.stateContext = stateContext;
    // @ts-ignore
    this.dispatchContext = dispatchContext;

    if (isFunction(dispatch)) {
      // @ts-ignore
      this.dispatch = dispatch;
    }

    this.#state = state;

    this.isReady = !!(id && state && dispatch);
  }

  id = undefined;

  stateContext = undefined;
  dispatchContext = undefined;

  // @ts-ignore
  #state = {};

  isReady = false;

  getId = () => this.id;

  getStateContext = () => this.stateContext;

  getDispatchContext = () => this.dispatchContext;

  getState = () => this.#state;

  getIsReady = () => this.isReady;

  setIsReady = (ready: boolean) => {
    this.isReady = ready;
  };

  setState = (state: ReducerStateType) => {
    this.#state = state;
  };

  setDispatch = (dispatch: DispatchType) => {
    // @ts-ignore
    this.dispatch = dispatch;
  };

  dispatch = undefined;
}

export default Store;
