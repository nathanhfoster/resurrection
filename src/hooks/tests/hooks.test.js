import React, { createContext } from 'react';
import { render } from '@testing-library/react';
import ContextStore from '../..';
import {
  useDispatch,
  useLazyMemo,
  usePreviousValue,
  useReducerWithThunk,
  useSelector
} from '..';

const { ContextProvider, setStateReducer } = ContextStore;

const mockContext = createContext();

const initialState = { key1: 'Test' };

const setup = (hook, contextConsumer, ...args) => {
  let returnVal;
  const TestComponent = () => {
    returnVal = hook(...args);
    return <div />;
  };
  const wrapper = render(
    <ContextProvider
      name='ContextStore'
      context={contextConsumer}
      initialState={initialState}
    >
      <TestComponent />
    </ContextProvider>
  );
  return [returnVal, wrapper]
};

describe('hooks', () => {
  describe('useDispatch', () => {
    it('Should return the dispatch with a context as a parameter', () => {
      const [dispatch] = setup(useDispatch, mockContext, mockContext);
      expect(dispatch).toBeDefined();
    });
    it('Should return the dispatch without a context as a parameter', () => {
      const [dispatch] = setup(useDispatch);
      expect(dispatch).toBeDefined();
    });
  });

  describe('useLazyMemo', () => {
    it('Should return a lazy value', () => {
      const initializer = () => true;
      const [result, wrapper] = setup(useLazyMemo, undefined, initializer);
      wrapper.rerender();
      expect(result).toBe(true);
    });
  });

  describe('usePreviousValue', () => {
    it('Should return a previous value', () => {
      const value = 1;
      const [result, wrapper] = setup(usePreviousValue, undefined, value);
      wrapper.rerender();
      expect(result).toBe(1);
    });
  });

  describe('useReducerWithThunk', () => {
    it('Should return a reducer with thunk with no initializer', () => {
      const [reducer] = setup(
        useReducerWithThunk,
        undefined,
        setStateReducer,
        initialState,
      );
      const [state, dispatch] = reducer;
      expect(state).toMatchObject(initialState);
      expect(dispatch).toBeDefined();
    });

    it('Should return a reducer with thunk with an initializer', () => {
      const initializer = (stateOrProps) => ({
        ...stateOrProps,
        key2: 'Test'
      });
      const [reducer] = setup(
        useReducerWithThunk,
        undefined,
        setStateReducer,
        initialState,
        initializer,
      );
      const [state, dispatch] = reducer;
      expect(state).toMatchObject({
        ...initialState,
        key2: 'Test',
      });
      expect(dispatch).toBeDefined();
    });
  });

  describe('useSelector', () => {
    const mapStateToSelector = ({ key1 }) => ({ key2: key1 })
    it('Should throw an error when a selector is not passed', () => {
      expect(() => setup(useSelector, undefined)[0]).toThrowError()
    });
    it('Should return a selected state without a equality function and contextConsumer', () => {
      const [selector] = setup(useSelector, undefined, mapStateToSelector)
      expect(selector).toMatchObject({ key2: initialState.key1 })
    });
    it('Should return a selected state without a contextConsumer', () => {
      const isEqual = () => true;
      const [selector] = setup(
        useSelector,
        undefined,
        mapStateToSelector,
        isEqual,
      );
      expect(selector).toMatchObject({ key2: initialState.key1 });
    });
    it('Should return a selected state', () => {
      const isEqual = () => false;
      const [selector] = setup(
        useSelector,
        mockContext,
        mapStateToSelector,
        isEqual,
        mockContext,
      );
      expect(selector).toMatchObject({ key2: initialState.key1 });
    });
  });
});
