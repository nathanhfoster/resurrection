import { useLayoutEffect, useMemo, useRef } from 'react';
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

  // @ts-ignore
  const arePropsEqual = isFunction(isEqual) ? isEqual(previousProps, props) : false;

  useLayoutEffect(() => {
    if (!arePropsEqual) {
      componentRef.current = Component;
      componentPropsRef.current = props;
    }
  });

  const renderComponent = useMemo(() => {
    let FinalComponent = Component;
    let finalProps = props;

    if (arePropsEqual) {
      FinalComponent = componentRef.current;
      finalProps = componentPropsRef.current;
    }

    // @ts-ignore
    return <FinalComponent {...finalProps} ref={ref} />;
  }, [arePropsEqual, Component, props, ref]);

  return renderComponent;
};

export default useMemoComponent;
