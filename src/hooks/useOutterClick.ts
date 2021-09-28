import { useOutterClickType } from 'types';
import { useCallback, useEffect, useRef } from 'react';

export const useOutterClick: useOutterClickType = (cb, dep) => {
  const ref = useRef<HTMLElement>(null);
  const callback = useCallback(cb, dep);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        callback(e);
      }
    };

    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [ref, callback]);

  return ref;
};

export default useOutterClick;
