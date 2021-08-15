import React, { useEffect, memo } from 'react';
import { connect, useDispatch } from 'resurrection';

export const mapStateToProps = ({ someReducer: { someKeyFromMyStore } }) => ({ someKeyFromMyStore });

export const ChildComponent1 = connect(mapStateToProps)(({ someKeyFromMyStore }) => {
  return <div>{someKeyFromMyStore}</div>;
});

export const ChildComponent2 = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'SOME_ACTION_TYPE', payload: 'Hello World!' });
    }, 333);

    setTimeout(() => {
      dispatch({ type: 'SOME_ACTION_TYPE', payload: 'Hello World!!' });
    }, 666);

    setTimeout(() => {
      dispatch({ type: 'SOME_ACTION_TYPE', payload: 'Hello World!!!' });
    }, 999);
  }, []);

  console.log('useDispatch() caused a rerender');
  return <div>useDispatch()</div>;
});
