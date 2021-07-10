import isFunction from '../utils/isFunction';
import { getRandomInt } from '../utils';
import { StoreInterface, Context, Dispatch, ReducerState } from '../types';

/**
 * Holds the properties of a store object
 */
class Store implements StoreInterface {
  constructor(
    id?: number | string,
    //@ts-ignore
    context: Context,
    dispatch: Dispatch,
    state: ReducerState) {
    this.id = id || getRandomInt(0, 1000);

    //@ts-ignore
    this.context = context;

    if (isFunction(dispatch)) {
      //@ts-ignore
      this.dispatch = dispatch;
    }

    this.state = state;

    this.isReady = !!(id && dispatch && state);
  };

  id = undefined;

  context = undefined;

  state = {};

  isReady = false;


  getId = () => this.id;

  getContext = () => this.context;

  getState = () => {
    if (!this.isReady) {
      throw Error('Store is NOT ready!');
    }

    return this.state;
  };

  getIsReady = () => this.isReady;

  setIsReady = (ready: boolean) => {
    this.isReady = ready;
  };
  setState = (state: ReducerState) => {
    this.state = state;
  };

  setDispatch = (dispatch: Dispatch) => {
    //@ts-ignore
    this.dispatch = dispatch;
  };

  dispatch = () => {
    throw Error('Store is NOT ready!');
  };

}

export default Store;
