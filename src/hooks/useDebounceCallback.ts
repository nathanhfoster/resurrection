import { useCallback, useRef } from 'react';
import { useDebounceCallbackType } from 'types';

const useDebounceCallback: useDebounceCallbackType = (callback, delay = 400) => {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const callbackRef = useRef(callback);

    const debouncedCallback = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(callbackRef.current, delay);
    }, [delay]);

    return debouncedCallback;
};

export default useDebounceCallback;