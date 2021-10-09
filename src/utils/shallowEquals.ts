import { EqualityFunctionType } from 'types';

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
const shallowEquals: EqualityFunctionType = (objA, objB) => {
  if (Object.is(objA, objB)) {
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
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;

};

export default shallowEquals;
