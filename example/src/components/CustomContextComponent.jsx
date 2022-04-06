import { createContext, useEffect } from 'react';
import { connect } from 'resurrection';

export const DEFAULT_STATE = { inputs: [1, 2, 3] };

export const CustomContextComponentStateContext = createContext(DEFAULT_STATE);
CustomContextComponentStateContext.displayName = 'CustomContextComponentStateContext';
export const CustomContextComponentDispatchContext = createContext(null);
CustomContextComponentDispatchContext.displayName = 'CustomContextComponentDispatchContext';

// we implement areMergedPropsEqual to only mount the input fields once to the DOM
export const CustomContextComponentOptions = {
  stateContext: CustomContextComponentStateContext,
  dispatchContext: CustomContextComponentDispatchContext,
  areMergedPropsEqual: (prevState, nextState) => {
    const areEqual = prevState.renderInputs.length === nextState.renderInputs.length;
    return areEqual;
  }
};

const mapStateToProps = ({ inputs }) => ({ renderInputs: inputs.map((input) => <span>{input}</span>) });

export const CustomContextComponent = connect(
  mapStateToProps,
  undefined,
  undefined,
  CustomContextComponentOptions
)(({ renderInputs, dispatch }) => {
  console.log('CustomContextComponent', renderInputs);
  useEffect(() => {
    console.log('dispatch: ', dispatch);
  }, [dispatch]);
  return <div>{renderInputs}</div>;
});
