import { useEffect } from 'react';
import useMounted from './useMounted';
import { useEffectAfterMountType } from 'types';

const useEffectAfterMount: useEffectAfterMountType = (callback, dependencies) => {
  const mounted = useMounted();

  useEffect(() => (mounted ? callback() : undefined), dependencies);
};

export default useEffectAfterMount;
