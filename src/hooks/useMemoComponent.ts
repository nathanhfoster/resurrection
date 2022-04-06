import { useEffect, useRef } from 'react';
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
const useMemoComponent: useLazyMemoType = (Component, props, isEqual) => {
    const previousProps = usePreviousValue(props);
    const ComponentRef = useRef(Component);

    useEffect(() => {
        const shouldUpdate = isFunction(isEqual) ? !isEqual(previousProps, props) : true;
        if (shouldUpdate) {
            ComponentRef.current = Component;
        }
    });

    return ComponentRef.current;
};

export default useMemoComponent;
