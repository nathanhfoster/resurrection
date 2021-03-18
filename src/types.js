/**
 * @typedef {Object} ComponentProps
 */

/**
 * @typedef {Object} ContexStoreProps
 * @property {String|Number=} name - the name of the ContextStore
 * @property {Object} context - the last reference key to the form stored in a Redux reducer
 * @property {Function|Objec=} reducers - first object to compare
 * @property {Object=} initialState - the initial state of the reducer
 * @property {Object=} props - passed from an HOC that controlls the state of the store
 * @property {Function=} initializer - utility function that sets the initial state of the reducer
 * @property {React.ReactElement} children - the child components of the store
 */

/**
 * Determines if the component should be memoized
 * or an equality Function that determines if the Component should rerender
 * @typedef {Object} ConnectOptions
 * @property {Object} context - a context consumer.
 * You need to pass the instance of your context to both
 * <ContextProvider /> and your connected component.
 * You may pass the context to your connected component either
 * by passing it here as a field of option,
 * or as a prop to your connected component in rendering.
 * @property {Boolean} pure - when options.pure is true,
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
 * you may wish to override them with custom implementations for performance or other reasons.
 * @property {Function=} areStatesEqual - when pure, compares incoming store state
 * to its previous value.
 * areStatesEqual: (next: Object, prev: Object) => boolean
 * @property {Function=} areOwnPropsEqual - when pure, compares the result of ownProps
 * to its previous value.
 * areOwnPropsEqual: (next: Object, prev: Object) => boolean
 * @property {Function=} areStatePropsEqual - when pure, compares the result of mapStateToProps
 * to its previous value.
 * areStatePropsEqual: (next: Object, prev: Object) => boolean
 * @property {Function=} areMergedPropsEqual - when pure, compares the result of mergeProps
 * to its previous value.
 * areMergedPropsEqual: (next: Object, prev: Object) => boolean
 * @property {Function=} forwardRef - If {forwardRef : true} has been passed to connect,
 * adding a ref to the connected wrapper component will actually
 * return the instance of the wrapped component.
 * */

/**
 * @callback Dispatch
 * @param {Object|Thunk} action
 * @returns {void|*}
 */

/**
 * @callback Thunk
 * @param {Dispatch} dispatch
 * @param {function(): Object} getState
 * @returns {void|*}
 */

/**
 * @typedef {Object.<String, *>} ReducerState
 */

/**
 * @callback GetReducerState
 * @returns {ReducerState}
 */

/**
 * @typedef {Object} ReducerAction
 * @property {String} type - the action type
 * @property {*} payload - the action payload
 */

/**
 * @callback Action
 * @property {Array.<*>} args - arguments to the action
 * @returns {ReducerAction}
 */

/**
 * @callback ThunkAction
 * @property {Thunk} dispatch
 * @property {GetReducerState} getState
 * @returns {*}
 */

/**
 * @callback ThunkActionDispatch
 * @property {*} args - arguments to the action
 * @returns {Action|ThunkAction}
 */

/**
 * @callback Reducer
 * @param {Object.<ReducerState>} state
 * @param {Object.<ReducerAction>} action
 * @returns {ReducerState}
 */

/**
 * @typedef {Object.<String, Reducer>} CombinedReducers
 */

/**
 * @callback MapStateToProps
 * @property {ReducerState} state - the reducer's state
 * @property {Object.<String, *>} ownProps - the components own props passed from an HOC
 * @return {ComponentProps}
 */

/**
 * @callback MapDispatchToProps
 * @property {function(dispatch: Thunk): Action|Object.<String, ThunkActionDispatch>} dispatch
 * @return {Action|ThunkActionDispatch}
 */

/**
 * @callback SelectorEqualityFunction
 * @property {*} nextSelector - the next selected state
 * @property {*} previousSelector - the prev selected state
 * @return {Boolean} - whether the two selected states are equal
 */

/**
 * @callback MapStateToSelector
 * @property {function(state: ReducerState): ComponentProps} mapStateToSelector - callback
 * @property {SelectorEqualityFunction} isEqual - callback
 * @return {ComponentProps}
 */

/**
 * @callback ReducerStateInitializer
 * @property {ReducerState|ComponentProps} stateOrProps - state or props
 * @return {ReducerState}
 */
