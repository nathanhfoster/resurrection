import { usePreviousValueType } from 'types';
import { useEffect, useRef } from 'react';

/**
 * On each render returns the previous value of the given variable/constant
 * @param {*} value - any value
 * @returns {*} any previous value
 */
const usePreviousValue: usePreviousValueType = (value) => {
  const prevValue = useRef(value);

  useEffect(() => {
    prevValue.current = value;

    return () => {
      prevValue.current = undefined;
    };
  });

  return prevValue.current;
};

export default usePreviousValue;
