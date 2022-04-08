import { useLayoutEffect, useEffect } from 'react';

/**
 * useLayoutEffect hook that works on both the client and server side
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;


export default useIsomorphicLayoutEffect;
