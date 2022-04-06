import {
  MapStateToSelectorType,
  ReducerStateInitializerType,
  ReducerStateType,
  DispatchType,
  ReducerType,
  useMemoComponentOptionsType,
  EqualityFunctionType
} from 'types';
import { createContext } from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import {
  useDispatch,
  useLazyMemo,
  useMemoComponent,
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

const DATA_TEST_ID = 'MockComponent';
const MOCK_VALUE = 'MOCK_VALUE';
const NEXT_MOCK_VALUE = 'NEXT_MOCK_VALUE';

const MockComponent: React.FC<any> = ({ value }) => <div data-testid={DATA_TEST_ID}>{value}</div>;
const shouldRerenderIsEqual: EqualityFunctionType = (prevProps, nextProps) => prevProps.value === nextProps.value;
const shouldNotRerenderIsEqual = () => true;

describe('useMemoComponent', () => {
  it('should return the latest instance of the component', () => {
    const componentProps = { value: MOCK_VALUE };
    const hookOptions: useMemoComponentOptionsType = {
      Component: MockComponent,
      props: componentProps,
      isEqual: shouldRerenderIsEqual
    };
    const { result, rerender: rerenderHook } = renderHook(
      (options: useMemoComponentOptionsType) => useMemoComponent(options),
      {
        initialProps: hookOptions
      }
    );

    const { getByTestId, rerender: rerenderComponent } = render(result.current);

    expect(getByTestId(DATA_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(componentProps.value)).toBeInTheDocument();

    const newComponentProps = { ...componentProps, value: NEXT_MOCK_VALUE };
    const newHookOptions = { ...hookOptions, props: newComponentProps };
    rerenderHook(newHookOptions);
    rerenderComponent(result.current);

    expect(screen.queryByText(newComponentProps.value)).toBeInTheDocument();
  });

  it('should not return the latest instance of the component when the props are the same', () => {
    const componentProps = { value: MOCK_VALUE };
    const hookOptions = { Component: MockComponent, props: componentProps, isEqual: shouldNotRerenderIsEqual };
    const { result, rerender: rerenderHook } = renderHook((options) => useMemoComponent(options), {
      initialProps: hookOptions
    });

    const { getByTestId, rerender: rerenderComponent } = render(result.current);

    expect(getByTestId(DATA_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(componentProps.value)).toBeInTheDocument();

    const newComponentProps = { ...componentProps, value: NEXT_MOCK_VALUE };
    const newHookOptions = { ...hookOptions, props: newComponentProps };
    rerenderHook(newHookOptions);
    rerenderComponent(result.current);

    expect(screen.queryByText(newComponentProps.value)).not.toBeInTheDocument();
  });
});
