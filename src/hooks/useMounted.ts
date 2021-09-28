import { useMountedType } from 'types';
import { useRef, useEffect } from 'react';

const useMounted: useMountedType = (initialValue = false) => {
  const mounted = useRef(initialValue);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  });

  return mounted.current;
};

export default useMounted;
