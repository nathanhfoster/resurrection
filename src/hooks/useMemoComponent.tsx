import { useMemo, useRef } from 'react';
import { useMemoComponentType } from 'types';
import { isFunction } from 'utils';
import usePreviousValue from './usePreviousValue';

/**
 * Hook that controls the reference of a component to only update when it's previous and next props differ
 * @param {JSX.Element} Component
 * @param {object} ref
 * @param {object} props
 * @param {function} isEqual
 * @returns {JSX.Element}
 */
 const useMemoComponent: useMemoComponentType = ({ Component, props, ref, isEqual }) => {
  const previousProps = usePreviousValue(props);

  // Component ref instance
  const ComponentRef = useRef(<Component {...props} ref={ref} />);

  const PureComponent = useMemo(() => {
    // Check if props have stayed the same
    const arePropsEqual = isFunction(isEqual) ? isEqual(previousProps, props) : false;

    // If the props differ update the reference of the component instance
    if (!arePropsEqual) {
      ComponentRef.current = <Component {...props} ref={ref} />;
    }
    return ComponentRef.current;
  }, [props, Component]);

  return PureComponent;
};

export default useMemoComponent;
