import {
  MapStateToSelectorType,
  ReducerStateInitializerType,
  ReducerStateType,
  DispatchType,
  ReducerType
} from 'types';
import { createContext } from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import {
  useDispatch,
  useLazyMemo,
  usePreviousValue,
  useReducerWithThunk,
  useSelector,
  ContextProvider,
  setStateReducer
} from '../..';

const initialState: ReducerStateType = { key1: 'Test' };

const mockStateContext = createContext<ReducerStateType>(initialState);
const mockDispatchContext = createContext<DispatchType>(null as any);

const mockReducer: ReducerType = (state, action) => initialState;

const setup = (hook: any, ...args: any[]): [any, any] => {
  let returnVal;
  const TestComponent = () => {
    returnVal = hook(...args);
    return <div />;
  };
  const wrapper = render(
    <ContextProvider
      name='ContextStore'
      stateContext={mockStateContext}
      dispatchContext={mockDispatchContext}
      reducers={mockReducer}
    >
      <TestComponent />
    </ContextProvider>
  );
  return [returnVal, wrapper];
};

describe('hooks', () => {
  describe('useDispatch', () => {
    it('Should return the dispatch with a context as a parameter', () => {
      const [dispatch] = setup(useDispatch);
      expect(dispatch).toBeDefined();
    });
    it('Should return the dispatch without a context as a parameter', () => {
      // @ts-ignore
      const [dispatch] = setup(useDispatch);
      expect(dispatch).toBeDefined();
    });
  });

  describe('useLazyMemo', () => {
    it('Should return a lazy value', () => {
      const initializer = () => true;
      const { rerender, result } = renderHook(() => useLazyMemo(initializer));

      expect(result.current).toEqual(initializer());
      rerender(() => useLazyMemo(() => false));
      expect(result.current).toEqual(initializer());
    });
  });

  describe('usePreviousValue', () => {
    it('should return the previous value', () => {
      const MOCK_VALUE = 'MOCK_VALUE';
      const { rerender, result } = renderHook(() => usePreviousValue(MOCK_VALUE));

      expect(result.current).toBeUndefined();
      rerender();
      expect(result.current).toEqual(MOCK_VALUE);
    });
  });

  describe('useReducerWithThunk', () => {
    it('Should return a reducer with thunk with no initializer', () => {
      const [reducer] = setup(useReducerWithThunk, setStateReducer, initialState);
      const [state, dispatch] = reducer;
      expect(state).toMatchObject(initialState);
      expect(dispatch).toBeDefined();
    });

    it('Should return a reducer with thunk with an initializer', () => {
      const initializer: ReducerStateInitializerType = (stateOrProps) => ({
        ...stateOrProps,
        key2: 'Test'
      });
      const [reducer] = setup(useReducerWithThunk, setStateReducer, initialState, initializer);
      const [state, dispatch] = reducer;
      expect(state).toMatchObject({
        ...initialState,
        key2: 'Test'
      });
      expect(dispatch).toBeDefined();
    });
  });

  describe('useSelector', () => {
    const mapStateToSelector: MapStateToSelectorType = ({ key1 }: ReducerStateType) => ({ key2: key1 });

    it('Should throw an error when a selector is not passed', () => {
      expect(() => setup(useSelector)[0]).toThrowError();
    });

    it('Should return a selected state without a equality function and contextConsumer', () => {
      const [selector] = setup(useSelector, mapStateToSelector, undefined, mockStateContext);
      expect(selector).toMatchObject({ key2: initialState.key1 });
    });
    it('Should return a selected state without a contextConsumer', () => {
      const isEqual = () => true;
      const [selector] = setup(useSelector, mapStateToSelector, isEqual, mockStateContext);
      expect(selector).toMatchObject({ key2: initialState.key1 });
    });
    it('Should return a selected state', () => {
      const isEqual = () => false;
      const [selector] = setup(useSelector, mapStateToSelector, isEqual, mockStateContext);
      expect(selector).toMatchObject({ key2: initialState.key1 });
    });
  });
});
