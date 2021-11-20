import { DispatchType, MapDispatchToPropsType, ThunkActionDispatchType, ReducerAction } from 'types';
import bindActionCreators from '../bindActionCreators';

let dispatch: DispatchType;

describe('bindActionCreators', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('Should throw an error when mapDispatchToProps is not an object', () => {
    const mapDispatchToProps = () => true;
    // @ts-ignore
    expect(() => bindActionCreators(mapDispatchToProps, dispatch)).toThrowError(
      'bindActionCreators expected an object or a function, instead received function.'
    );
  });

  it('Should throw an error when mapDispatchToProps is null', () => {
    const mapDispatchToProps = null;
    // @ts-ignore
    expect(() => bindActionCreators(mapDispatchToProps, dispatch)).toThrowError(
      'bindActionCreators expected an object or a function, instead received null.'
    );
  });

  it('Should throw an error when mapDispatchToProps is not an object', () => {
    const actionThatReturnsAnObject: ReducerAction = { type: 'SOME_ACTION_TYPE' };
    const actionThatCallsAnotherDispatchedAction: ThunkActionDispatchType = () => (dispatchThunk) => {
      dispatchThunk({ type: 'SOME_OTHER_TYPE', });
    };

    const mapDispatchToProps: MapDispatchToPropsType = {
      // @ts-ignore
      actionThatReturnsAnObject,
      actionThatCallsAnotherDispatchedAction
    };
    const result = bindActionCreators(mapDispatchToProps, dispatch);
    // @ts-ignore
    Object.values(result).forEach((action) => action());
    expect(result).toBeDefined();
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
