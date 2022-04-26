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
const useMemoComponent: useMemoComponentType = ({ Component, ref, props, isEqual }) => {
  const previousProps = usePreviousValue(props);

  // Component ref instance
  const componentRef = useRef(Component);
  const componentPropsRef = useRef(props);

  const renderComponent = useMemo(() => {
    // Use the previous component and props instance
    let FinalComponent = componentRef.current;
    let finalProps = componentPropsRef.current;

    // Check if props have stayed the same
    // @ts-ignore
    const arePropsEqual = isFunction(isEqual) ? isEqual(previousProps, props) : false;

    // If the props differ update the reference of the component instance and it's props
    if (!arePropsEqual) {
      componentRef.current = Component;
      componentPropsRef.current = props;
      FinalComponent = Component;
      finalProps = props;
    }
    // @ts-ignore
    return <FinalComponent {...finalProps} ref={ref} />;
  }, [props, Component]);

  return renderComponent;
};

export default useMemoComponent;
