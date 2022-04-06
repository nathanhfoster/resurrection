import { useEffect, useRef } from 'react';
import { useMemoComponentType } from 'types';
import usePreviousValue from './usePreviousValue';
import { isFunction } from 'utils';

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
