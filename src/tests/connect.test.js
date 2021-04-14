import React from 'react';
import { render } from '@testing-library/react';
import { ContextProvider } from '..';
import connect from '../connect';

const propMapper = (prop) => {
  switch (typeof prop) {
    case 'object':
    case 'boolean':
      return JSON.stringify(prop);
    case 'function':
      return `[function ${prop.name}]`;
    default:
      return prop;
  }
};

const Passthrough = props => Object.entries(props).map(([key, value]) => (
  <React.Fragment key={key}>
    <div data-testid={key} />
    <div data-testid={propMapper(value)} />
  </React.Fragment>
));

const initialState = { key1: 'key1 value', key2: 'key2 value' };

const setup = (context, ...args) => {
  const Container = props => <Passthrough {...props} />;

  const ChildComponent = connect(...args)(Container);

  return render(
    <ContextProvider context={context} initialState={initialState}>
      <ChildComponent />
    </ContextProvider>,
  );
};

describe('connect', () => {
  it('Should connect a component to a store and pass the dispatch API', () => {
    const wrapper = setup(undefined);
    const child = wrapper.getByTestId('dispatch');
    expect(child).toBeDefined();
  });
  it('Should mapStateToProps and render them', () => {
    const mapStateToProps = ({ key1 }) => ({ key2: key1 });

    const wrapper = setup(undefined, mapStateToProps);
    const child = wrapper.getByTestId('key2');
    expect(child).toBeDefined();
    expect(wrapper.getByTestId(initialState.key1)).toBeDefined();
  });
  it('Should mapDispatchToProps is an object', () => {
    const mapDispatchToProps = dispatch => ({ someAction: dispatch(jest.fn()) });

    const wrapper = setup(undefined, undefined, mapDispatchToProps);
    const child = wrapper.getByTestId('someAction');
    expect(child).toBeDefined();
  });
  it('Should bindActionCreators when mapDispatchToProps is an object', () => {
    const mapDispatchToProps = { someAction: jest.fn() };

    const wrapper = setup(undefined, undefined, mapDispatchToProps);
    const child = wrapper.getByTestId('someAction');
    expect(child).toBeDefined();
  });
  it('Should mergeProps', () => {
    const expected = 'This Should be overwritten';
    const mapStateToProps = ({ key1 }) => ({ key2: key1, someAction: expected });
    const mapDispatchToProps = { someAction: jest.fn() };
    const mergeProps = (stateProps, dispatchProps, props) => ({
      ...props,
      ...dispatchProps,
      ...stateProps,
    });

    const wrapper = setup(undefined, mapStateToProps, mapDispatchToProps, mergeProps);
    const child = wrapper.getByTestId('This Should be overwritten');
    expect(child).toBeDefined();
  });

  it('Should handle a custom options context', () => {
    const mapStateToProps = ({ key1 }) => ({ key2: key1 });
    const context = React.createContext();
    const isEqual = (prevProps, nextProps) => prevProps === nextProps;
    const options = { context, pure: false, areMergedPropsEqual: isEqual };

    const wrapper = setup(context, mapStateToProps, undefined, undefined, options);
    const child = wrapper.getByTestId('key2');
    expect(child).toBeDefined();
  });
});
