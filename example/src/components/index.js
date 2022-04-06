import React, { useEffect, memo } from 'react';
import { storeFactory, connect, useDispatch, useSelector, useEffectAfterMount } from 'resurrection';

export const mapStateToProps = ({ someReducer: { someKeyFromMyStore } }) => ({ someKeyFromMyStore });
export const isEqual = (oldProps, newProps) => {
  return true;
  console.log({ oldProps, newProps });
  return oldProps.someKeyFromMyStore === newProps.someKeyFromMyStore;
};

export const ChildComponent1 = connect(mapStateToProps)(({ someKeyFromMyStore, dispatch }) => {
  useEffect(() => {
    console.log('dispatch: ', dispatch);
  }, [dispatch]);

  return <div>{someKeyFromMyStore}</div>;
});

export const ChildComponent2 = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'SOME_OTHER_ACTION', payload: 'This should not cause a rerender!!!' });
    }, 100);

    setTimeout(() => {
      dispatch({ type: 'SOME_ACTION_TYPE', payload: 'Hello World!' });
    }, 333);

    setTimeout(() => {
      dispatch({ type: 'SOME_ACTION_TYPE', payload: 'Hello World!!' });
    }, 666);

    setTimeout(() => {
      const store = storeFactory.getStore();
      console.log('STORE: ', store);
      store?.dispatch({ type: 'SOME_ACTION_TYPE', payload: 'Hello World!!!' });
    }, 999);
  }, [dispatch]);

  useEffectAfterMount(() => {
    console.log('useDispatch() or SOME_OTHER_ACTION caused a rerender');
  });

  return <div>useDispatch()</div>;
});

export const ChildComponent3 = () => {
  const { someKeyFromMyStore } = useSelector(mapStateToProps);
  return <div>{someKeyFromMyStore}</div>;
};

export const ChildComponent4 = connect(mapStateToProps, undefined, undefined, {
  areMergedPropsEqual: isEqual
})(({ someKeyFromMyStore }) => {
  return <div>Should not rerender: {someKeyFromMyStore}</div>;
});
