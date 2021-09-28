import { getDerivedStateFromPropsType } from 'types';

/**
 * This function allows the state to be controlled
 * by an HOC by overwritting it with props
 */

const getDerivedStateFromProps: getDerivedStateFromPropsType = (state, props) => ({
  ...(state && {
    ...state
  }),
  ...(props && {
    ...props
  })
});

export default getDerivedStateFromProps;
