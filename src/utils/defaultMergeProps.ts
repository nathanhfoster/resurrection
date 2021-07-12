import { MergePropsType } from '@types';

const defaultMergeProps: MergePropsType = (stateProps, dispatchProps, props) => ({
  ...props,
  ...stateProps,
  ...dispatchProps
});

export default defaultMergeProps;
