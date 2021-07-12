import { useContext } from 'react';
import { ContextConsumer } from '../provider';
import { ContextStore, DispatchType } from '@types';

/**
 * This hook simulates Redux's useDispatch hook
 * The problem is that the useContext API always causes a rerender
 * If you want memoization, use the connect API
 * @param {React.ContextConsumer=} contextConsumer - the context consumer
 * @returns {Thunk} - the context's dispatch API
 */
const useDispatch = (contextConsumer: any = ContextConsumer): DispatchType =>
  useContext<ContextStore>(contextConsumer).dispatch;

export default useDispatch;
