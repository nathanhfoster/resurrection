import { ReactNode, Context as ReactContext } from 'react';

export interface StringMap {
    [index: string]: any;
}

export type ComponentProps = StringMap;

export type ReducerState = StringMap;

export type Context = ReactContext<ReducerState>;

export type EqualityFunction = (prevPropsOrState: any, nextPropsOrState: any) => boolean;

export interface ConnectOptions {
    /**
     * A context consumer.
     * You need to pass the instance of your context to both
     * <ContextProvider /> and your connected component.
     * You may pass the context to your connected component either
     * by passing it here as a field of option,
     * or as a prop to your connected component in rendering.
     */
    context?: Context;
    /**
     * When options.pure is true,
     * connect performs several equality checks that are used to avoid unnecessary calls to
     * mapStateToProps,
     * mapDispatchToProps,
     * mergeProps,
     * and ultimately to render.
     * These include areStatesEqual,
     * areOwnPropsEqual,
     * areStatePropsEqual,
     * and areMergedPropsEqual.
     * While the defaults are probably appropriate 99% of the time,
     * you may wish to override them with custom implementations for performance or other reasons
     */
    pure?: boolean;
    /**
     * When pure, compares incoming store state
     * to its previous value.
     * areStatesEqual: (next: Object, prev: Object) => boolean
     */
    areStatesEqual: EqualityFunction;
    /**
     * When pure, compares the result of ownProps
     * to its previous value.
     * areOwnPropsEqual: (next: Object, prev: Object) => boolean
     */
    areOwnPropsEqual: EqualityFunction;
    /**
     * When pure, compares the result of mapStateToProps
     * to its previous value.
     * areStatePropsEqual: (next: Object, prev: Object) => boolean
     */
    areStatePropsEqual: EqualityFunction;
    /**
     * When pure, compares the result of mergeProps
     * to its previous value.
     * areMergedPropsEqual: (next: Object, prev: Object) => boolean
     */
    areMergedPropsEqual: EqualityFunction;
    /**
     * If {forwardRef : true} has been passed to connect,
     * adding a ref to the connected wrapper component will actually
     * return the instance of the wrapped component.
     */
    forwardRef: Function;
}

export type Dispatch = (action: ReducerAction | Thunk) => any;

export type Thunk = (dispatch: Dispatch, getState: GetReducerState) => any;

export type GetReducerState = () => ReducerState;

export interface ReducerAction {
    type: string;
    payload: any;
}

export type Action = (args: any[]) => ReducerAction;

export type ThunkAction = (dispatch: Dispatch, getState: GetReducerState) => any;

export type ThunkActionDispatch = (args: any[]) => Action | ThunkAction;

export type Reducer = (state: ReducerState, action: ReducerAction) => ReducerState;

export interface CombinedReducers {
    [index: string]: Reducer;
}

export type MapStateToProps = (state: ReducerState, ownProps: ComponentProps) => ComponentProps;

export interface ThunkActionDispatchMap {
    [index: string]: ThunkActionDispatch;
}

export type MapDispatchToProps = (dispatch: ThunkActionDispatch | ThunkActionDispatchMap) => Action | ThunkActionDispatch;

export type MergeProps = (
    stateToProps: ComponentProps,
    dispatchToProps: Action | ThunkActionDispatch,
    ownProps: ComponentProps,
) => ComponentProps;

export type SelectorEqualityFunction = (nextSelector: any, previousSelector: any) => boolean;

export type MapStateToSelector = (
    mapStateToSelector: (state: ReducerState) => ComponentProps,
    isEqual: SelectorEqualityFunction) => ComponentProps;

export type ReducerStateInitializer = (stateOrProps: ReducerState | ComponentProps) => ReducerState;

/**
 * @property {Objec.<String, *>=} initialState - the initial state of the reducer
 * @property {Object.<String, *>=} props - passed from an HOC that controls
 * the state of the store use this if you want prop changes to overwrite the state
 * @property {Function=} initializer - sets the initial state of the reducer
 * @property {React.ReactElement} children - the child components that will consume the store
 */

export interface ReducerMap {
    [index: string]: Reducer;
}

export interface ContextStoreProps {
    /** the unique name of the ContextStore */
    name?: string | number;
    /** allows you to supply a custom context instance to be used by resurrection.
    * You need to pass the instance of your context
    * to both <ContextProvider /> and your connected component.
    * You may pass the context to your connected component either
    * by passing it here as a field of option, or as a prop to your connected component in rendering.
    **/
    context: Context;
    reducers: Reducer | ReducerMap;
    initialState: ReducerState;
    props: ComponentProps;
    initializer: ReducerStateInitializer;
    children: ReactNode;
}

export interface ContextStore {
    state: ReducerState;
    dispatch: Dispatch;
}

export type StoreNameOrContext = string | Context;

export interface StoreInterface {
    id?: string | number;
    context?: Context;
    isReady: boolean;
    getId: () => string | number | undefined;
    getContext: () => Context | undefined;
    getState: () => ReducerState;
    getIsReady: () => boolean;
    setIsReady: (ready: boolean) => void;
    setState: (state: ReducerState) => void;
    setDispatch: (dispatch: Dispatch) => void;
    dispatch: Dispatch,
}

export interface StoresInterface {
    stores: StoreInterface[];
    getStores: () => StoreInterface[];
    getStore: (nameOrContext: StoreNameOrContext) => StoreInterface;
    setStore: (store: StoreInterface) => void;
    isStoreReady: (nameOrContext: StoreNameOrContext) => boolean;
    setStoreReady: (nameOrContext: StoreNameOrContext, ready: boolean) => void;
    setStoreState: (nameOrContext: StoreNameOrContext, state: ReducerState) => void;
    setStoreDispatch: (nameOrContext: StoreNameOrContext, dispatch: Dispatch) => void;
}