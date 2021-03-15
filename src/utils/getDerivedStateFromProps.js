/**
 * This function allows the state to be controlled by a HOC by overwritting it with props
 * @param {ReducerState} state - state object
 * @param {ComponentProps=} props - props to make the state controlled from a HOC
 * @returns {ReducerState} - the new merged state
 */

const getDerivedStateFromProps = (state, props) => ({
  ...(state && {
    ...state,
  }),
  ...(props && {
    ...props,
  }),
})

export default getDerivedStateFromProps
