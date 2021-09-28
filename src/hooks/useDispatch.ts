import { useContext } from 'react';
import { DispatchContextConsumer } from '../provider';
import { DispatchType, useDispatchType } from 'types';

/**
 * This hook simulates Redux's useDispatch hook
 * The problem is that the useContext API always causes a rerender
 * If you want memoization, use the connect API
 * @param {React.Context=} dispatchContextConsumer - the context consumer
 * @returns {Thunk} - the context's dispatch API
 */
const useDispatch: useDispatchType = (dispatchContextConsumer = DispatchContextConsumer) =>
  useContext<DispatchType>(dispatchContextConsumer);

export default useDispatch;
