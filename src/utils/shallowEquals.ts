import { EqualityFunctionType } from '@types';

/**
 * This function chekcs for strict equality
 * @param {*} x - first value to compare
 * @param {*} y - second value to compare
 * @returns {Boolean} - whether the two values are strictly equal or not
 */
const is: EqualityFunctionType = (x, y) => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  // Check if they are both NaN
  // eslint-disable-next-line
  return x !== x && y !== y;
};

/**
 * This function checks if a value is a comparable object
 * @param {*} obj - first object to compare
 * @returns {Boolean} - whether the value is a comparable object or not
 */
const isNotAComparableObject = (obj: any): boolean => typeof obj !== 'object' || obj === null;

/**
 * This function does a shallow comparison on two objects
 * @param {Object} objA - first object to compare
 * @param {Object} objB - second object to compare
 * @returns {Boolean} - whether the two objects are equal or not
 */
const shallowEqual: EqualityFunctionType = (objA, objB) => {
  if (is(objA, objB)) {
    return true;
  }

  if (isNotAComparableObject(objA) || isNotAComparableObject(objB)) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
};

export default shallowEqual;
