## ContextStore

[State management library](https://github.com/strap8/resurrection) that follows Flux / Redux / Thunk architecture but uses React's latest useContext and useReducer hooks.

### Props

ContextProvider props you may want to specify include:

- name: String
- context: Object
- reducers: Function | Object
- initialState: Object
- props: Object
- initializer: Function
- children: Node

```js
/**
 * @typedef {Object} ContexStoreProps
 * @property {String|Number=} name - the name of the ContextStore
 * @property {Object} context - allows you to supply a custom context instance to be used by resurrection.
 * You need to pass the instance of your context to both <ContextProvider /> and your connected component.
 * You may pass the context to your connected component either by passing it here as a field of option, or as a prop to your connected component
 * in rendering.
 * @property {Function|Object.<String, Function>=} reducers - first object to compare
 * @property {Object.<String, *>=} initialState - the initial state of the reducer
 * @property {Object.<String, *>=} props - passed from an HOC that controls the state of the store use this if you want prop changes to
 * overwrite the state
 * @property {Function=} initializer - sets the initial state of the reducer
 * @property {React.ReactElement} children - the child components that will consume the store
 */
```

connect arguments you may want to specify include:

- context: object
- pure: boolean
- areStatesEqual: function
- areOwnPropsEqual: function
- areStatePropsEqual: function
- areMergedPropsEqual: function
- forwardRef: function

```js
/**
 * Connects a Component to the ContextStore
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
 */

/**
 * This function simulates Redux's connect API
 * @param {MapStateToProps=} mapStateToProps - reducer dispatch API
 * @param {MapDispatchToProps=} mapDispatchToProps - reducer state
 * @param {Function=} mergeProps - function to merge props
 * @param {ConnectOptions=} options - options
 * @returns {React.memo|React.FunctionComponent} - a connected component
 **/

export default (mapStateToProps, mapDispatchToProps, mergeProps, options)(SomeChildComponent);
```

See also react-redux's [connect](https://react-redux.js.org/api/connect#connect)

Hooks
[useDispatch](https://react-redux.js.org/api/hooks#usedispatch)
[useSelector](https://react-redux.js.org/api/hooks#useselector)

## License

MIT © [strap8](https://github.com/strap8)
