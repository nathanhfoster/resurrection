import { useLayoutEffect, useRef } from 'react';
import { useMemoComponentType } from 'types';
import usePreviousValue from './usePreviousValue';
import { isFunction } from 'utils';

/**
 * Hook that controls the reference of a component to only update when it's previous and next props differ
 * @param {JSX.Element} Component
 * @param {*} props
 * @param {function} isEqual
 * @returns {JSX.Element}
 */
const useMemoComponent: useMemoComponentType = ({ Component, ref, props, isEqual }) => {
  const ComponentRef = useRef(Component);
  const { current: ComponentInstance } = ComponentRef;
  const previousProps = usePreviousValue(props);

  useLayoutEffect(() => {
    // @ts-ignore
    const arePropsEqual = isFunction(isEqual) ? isEqual(previousProps, props) : false;
    if (!arePropsEqual) {
      ComponentRef.current = Component;
    }
  });
  // @ts-ignore
  return <ComponentInstance {...props} ref={ref} />;
};

export default useMemoComponent;
