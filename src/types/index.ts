import {
  JSXElementConstructor,
  ReactNode,
  Context as ReactContext,
  FunctionComponent,
  ReactElement,
  Reducer,
  Dispatch,
  SetStateAction
} from 'react';

export interface StringMap {
  [index: string]: any;
}

export type ChildrenType = ReactNode | ReactElement | JSX.Element;

export type ReducerStateType = StringMap;

export type CallbackType = (state: ReducerStateType) => any;

export type ComponentPropsType = JSXElementConstructor<ReducerStateType> | StringMap;

export interface ReducerAction {
  type: string;
  payload?: any;
}

export type DispatchType = Dispatch<ReducerAction>;

export type GetReducerStateType = () => ReducerStateType;

export interface ContextStore {
  state: ReducerStateType;
  dispatch: DispatchType;
}

export type ThunkActionType = (dispatch: DispatchType, getState: GetReducerStateType) => any;

export interface ThunkMap {
  [index: string]: ThunkActionType;
}

export type ContextType = any | ReactContext<ReducerStateType>;

export type EqualityFunctionType = (prevPropsOrState: any, nextPropsOrState: any) => boolean;

export interface ConnectOptions {
  context?: any | ContextType;
  pure?: boolean;
  areStatesEqual: EqualityFunctionType;
  areOwnPropsEqual: EqualityFunctionType;
  areMergedPropsEqual: EqualityFunctionType;
  forwardRef: () => any;
}

export type ActionType = () => ReducerAction;

export type ThunkActionDispatchType = (args: any[]) => ActionType | ThunkActionType;

export type ReducerType = Reducer<ReducerStateType, ReducerAction | ReducerStateType>;

export interface CombinedReducers {
  [index: string]: ReducerType;
}

export type MapStateToPropsType = (state: ReducerStateType, ownProps: ComponentPropsType) => ComponentPropsType;

export interface ThunkActionDispatchMap {
  [index: string]: ThunkActionDispatchType;
}

export type MapDispatchToPropsType = (
  dispatch: ThunkActionDispatchType | ThunkActionDispatchMap
) => ActionType | ThunkActionDispatchType | ThunkActionDispatchMap;

export type MergePropsType = (
  stateToProps: ComponentPropsType,
  dispatchToProps: ActionType | ThunkActionDispatchType | object,
  ownProps: ComponentPropsType
) => ComponentPropsType;

export type SelectorEqualityFunctionType = (nextSelector: any, previousSelector: any) => boolean;

export type MapStateToSelectorType = (
  mapStateToSelector: (state: ReducerStateType) => ComponentPropsType,
  isEqual?: SelectorEqualityFunctionType
) => ComponentPropsType;

export type ReducerStateInitializerType = (stateOrProps: ReducerStateType | ComponentPropsType) => ReducerStateType;

export interface ReducerMap {
  [index: string]: ReducerType;
}

export type ContextStoreNameType = number | string;

export type StoreNameOrContextType = ContextStoreNameType | ContextType | undefined;

export interface ContextStoreProps {
  name?: ContextStoreNameType;
  context?: ContextType;
  reducers: ReducerType | ReducerMap;
  initialState?: ReducerStateType;
  props?: ComponentPropsType;
  initializer?: ReducerStateInitializerType;
  children: ChildrenType;
}

export interface StoreInterface {
  id?: ContextStoreNameType;
  context?: ContextType;
  isReady: boolean;
  getId: () => ContextStoreNameType | undefined;
  getContext: () => ContextType | undefined;
  getState: () => ReducerStateType;
  getIsReady: () => boolean;
  setIsReady: (ready: boolean) => void;
  setState: (state: ReducerStateType) => void;
  setDispatch: (dispatch: DispatchType) => void;
  dispatch: DispatchType;
}

export interface StoresInterface {
  stores: StoreInterface[];
  getStores: () => StoreInterface[];
  getStore: (nameOrContext: StoreNameOrContextType) => StoreInterface;
  setStore: (store: StoreInterface) => void;
  isStoreReady: (nameOrContext: StoreNameOrContextType) => boolean;
  setStoreReady: (nameOrContext: StoreNameOrContextType, ready: boolean) => void;
  setStoreState: (nameOrContext: StoreNameOrContextType, state: ReducerStateType) => void;
  setStoreDispatch: (nameOrContext: StoreNameOrContextType, dispatch: DispatchType) => void;
}

export type ConnectType = (
  mapStateToProps: MapStateToPropsType,
  mapDispatchToProps: MapDispatchToPropsType,
  mergeProps: MergePropsType,
  options: ConnectOptions
) => (Component: FunctionComponent<ReducerStateType>) => (ownProps: ComponentPropsType) => ChildrenType;

export type useLazyMemoType = (initializer: () => any) => any;

export type usePreviousValueType = (value: any) => any;

export type useReducerWithThunkType = (
  reducer: ReducerType,
  initialState?: ReducerStateType,
  initializer?: ReducerStateInitializerType,
  props?: ComponentPropsType
) => [ReducerStateType, ThunkActionType];

export type reduceType = (newState: ReducerStateType) => ReducerStateType;

export type useSelectorType = (
  mapStateToSelector: MapStateToSelectorType,
  isEqual: SelectorEqualityFunctionType,
  contextConsumer: ContextType
) => ReducerStateType;

export type SetStateType = (updater: ReducerStateType, callback?: CallbackType) => any;

export type useSetStateReducerType = (
  initializerArg: ReducerStateType,
  initializer: ReducerStateInitializerType
) => [ReducerStateType, SetStateType];

export type bindActionCreatorsType = (dispatch: DispatchType) => (actionCreator: any) => (args: any[]) => any;

export type BindActionCreatorsType = (mapDispatchToProps: MapDispatchToPropsType, dispatch: DispatchType) => ThunkMap;

export type combineReducersType = (
  reducers: ReducerType | ReducerMap,
  initialState?: ReducerStateType
) => [ReducerStateType, ReducerType];

export type getReducerDefaultStateType = (reducer: ReducerType) => ReducerStateType;

export type getDerivedStateFromPropsType = (state?: ReducerStateType, props?: ComponentPropsType) => ReducerStateType;

export type getRandomIntType = (min: number, max: number) => number;

export type isFunctionType = (obj: any) => boolean;

export type SetStateReducerType = Reducer<any, SetStateAction<any>>;

export type SetObjectStateReducerType = Reducer<ReducerStateType, SetStateAction<ReducerStateType>>;

export type BooleanReducerType = Reducer<boolean, boolean | undefined>;

export type NumberReducerType = Reducer<number, SetStateAction<number>>;

export type SetStateConnectType = (
  stateContext: ContextType,
  setStateContext: ContextType,
  mapStateToProps: MapStateToPropsType,
  isEqual: EqualityFunctionType
) => (Component: FunctionComponent<ReducerStateType>) => (ownProps: ComponentPropsType) => ChildrenType;

export interface StatePropviderProps {
  StateContext: ContextType;
  reducer?: SetObjectStateReducerType;
  initialState: ReducerStateType;
  initializer?: ReducerStateInitializerType;
  SetStateContext: ContextType;
  children: ChildrenType;
}
