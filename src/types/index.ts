import React, {
  ReactNode,
  Context as ReactContext,
  FunctionComponent,
  ReactElement,
  Reducer,
  ReducerWithoutAction,
  Dispatch,
  DispatchWithoutAction,
  SetStateAction,
  RefObject,
  ReducerState,
  ReducerAction as ReactReducerAction,
  DependencyList,
  EffectCallback,
  ComponentType,
} from 'react';

export type StringMap = Record<string, any>;

export type ChildrenType = ReactNode | ReactElement | JSX.Element | React.FC<any> | React.ForwardRefRenderFunction<any>;

export type ReducerStateType = StringMap;

export type CallbackType = (state: ReducerStateType) => any;

export type ComponentPropsType = StringMap;

export interface ReducerAction {
  type: string;
  payload?: any;
}

export type DispatchType = Dispatch<ReducerAction> | Dispatch<ReactReducerAction<any>>;

export type GetReducerStateType = () => ReducerStateType;

export type ThunkActionType = (dispatch: DispatchType, getState: GetReducerStateType) => any;

export interface ThunkMap {
  [index: string]: ThunkActionType;
}

export type ContextType = any | ReactContext<ReducerStateType>;

export type EqualityFunctionType = (prevPropsOrState: any, nextPropsOrState: any) => boolean;

export interface ConnectOptions {
  stateContext?: any | ContextType;
  dispatchContext?: any | ContextType;
  pure?: boolean;
  areStatesEqual: EqualityFunctionType;
  areOwnPropsEqual: EqualityFunctionType;
  areMergedPropsEqual: EqualityFunctionType;
  forwardRef: () => any;
}

export type ActionType = () => ReducerAction;

export type ThunkActionDispatchType = (...args: any[]) => ActionType | ThunkActionType;

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
  stateContext?: ContextType;
  dispatchContext?: ContextType;
  reducers: ReducerType | ReducerMap;
  initialState?: ReducerStateType;
  derivedStateFromProps?: ComponentPropsType;
  initializer?: ReducerStateInitializerType;
  children: ChildrenType;
}

export interface StoreInterface {
  id?: ContextStoreNameType;
  stateContext?: ContextType;
  dispatchContext: ContextType;
  isReady: boolean;
  getId: () => ContextStoreNameType | undefined;
  getStateContext: () => ContextType | undefined;
  getDispatchContext: () => ContextType | undefined;
  getState: () => ReducerStateType | undefined;
  getIsReady: () => boolean;
  setIsReady: (ready: boolean) => void;
  setState: (state: ReducerStateType) => void;
  setDispatch: (dispatch: DispatchType) => void;
  dispatch: DispatchType | undefined;
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
) => (Component: React.FC<ComponentPropsType>) => (ownProps: ComponentPropsType) => ChildrenType;

export type useDispatchType = (contextConsumer: ContextType) => DispatchType;

export type useLazyMemoType = (initializer: () => any) => any;

export interface UseMemoComponentOptionsType<T> {
  Component: ComponentType<T>,
  props: ComponentPropsType;
  ref?: RefObject<any>;
  isEqual?: EqualityFunctionType;
}

export type useMemoComponentType<T = any> = (options: UseMemoComponentOptionsType<T>) => ReactElement;

export type useMountedType = (initialValue?: boolean) => boolean;

export type useEffectAfterMountType = (callback: EffectCallback, dependencies: DependencyList) => void;

export type usePreviousValueType = (value: any) => any;

export type BooleanReducerType = Reducer<boolean, boolean>;

export type NumberReducerType = Reducer<number | any, SetStateAction<number>>;

export type useNumberRefType = (initializerArg?: number) => [number, (action: number) => void];

export type ReducerInitializerType = (stateOrProps: any) => ReducerState<any>;

export type useBooleanReducerType = (
  initializerArg?: boolean,
  initializer?: ReducerWithoutAction<boolean>
) => [boolean, DispatchWithoutAction | Dispatch<boolean>];

export type useDebounceCallbackType = (callback: () => any, delay?: number) => () => void;

export type useSetRefStateType = (initializerArg?: any) => [any, SetStateAction<any>];

export type useNumberReducerType = (
  initializerArg?: number,
  initializer?: ReducerInitializerType
) => [number, NumberReducerType];

export type useReducerWithThunkType = (
  reducer: ReducerType,
  initialState?: ReducerStateType,
  initializer?: ReducerStateInitializerType,
  derivedStateFromProps?: ComponentPropsType
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

export type bindActionCreatorsType = (dispatch: DispatchType) => (actionCreator: any) => (...args: any[]) => any;

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

export interface MultiStateConntect {
  context: ContextType;
  mapStateToProps: MapStateToPropsType;
}

export interface MultiConnectOptionsType {
  mapStateToProps: MultiStateConntect[];
  mapDispatchToProps: MapDispatchToPropsType;
  dispatchContext: ContextType | [string, ContextType][];
  pure?: boolean;
  mergeProps?: MergePropsType;
  areOwnPropsEqual?: EqualityFunctionType;
  areMergedPropsEqual?: EqualityFunctionType;
  forwardRef?: boolean;
}

export type MultiConnectType = (
  options: MultiConnectOptionsType
) => (Component: FunctionComponent<ReducerStateType>) => (ownProps: ComponentPropsType) => ChildrenType;

export type SetStateConnectType = (
  stateContext: ContextType,
  setStateContext: ContextType,
  mapStateToProps: MapStateToPropsType,
  isEqual: EqualityFunctionType
) => (Component: FunctionComponent<ReducerStateType>) => (ownProps: ComponentPropsType) => ChildrenType;

export interface StatePropviderProps {
  name?: string | number;
  StateContext: ContextType;
  reducer?: SetObjectStateReducerType;
  initialState: ReducerStateType;
  initializer?: ReducerStateInitializerType;
  SetStateContext: ContextType;
  children: ChildrenType;
}

export type useOutterClickType = (cb: (...args: any[]) => any, dep: DependencyList) => void;
