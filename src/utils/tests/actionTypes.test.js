import actionTypes from '../actionTypes';
import isFunction from '../isFunction';

describe('actionTypes', () => {
  const runTest = ([key, value], i) => it(`Test ${i} with the key: ${key} should return a value from an unknow action`, () => {
    expect(isFunction(value) ? value() : value).toBeDefined();
  });

  Object.entries(actionTypes).forEach((test, i) => runTest(test, i));
});
