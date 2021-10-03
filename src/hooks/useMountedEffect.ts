import { useEffect } from 'react';
import useMounted from './useMounted';
import { useMountedEffectType } from 'types';

const useMountedEffect: useMountedEffectType = (callback, dependencies) => {
  const mounted = useMounted();

  useEffect(() => (mounted ? callback() : undefined), dependencies);
};

export default useMountedEffect;
