import { EqualityFunctionType } from 'types';
import isObjectLike from './isObjectLike';
/**
 * This function does a shallow comparison on two objects
 * @param {object} a - first object to compare
 * @param {object} b - second object to compare
 * @returns {boolean} - whether the two objects are equal
 */
const shallowEquals: EqualityFunctionType = (a, b) => {
  if (Object.is(a, b)) {
    return true;
  }

  if (!isObjectLike(a) || !isObjectLike(b)) {
    return false;
  }

  const keys = Object.keys(a);

  for (let i = 0; i < keys.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(b, keys[i]) || !Object.is(a[keys[i]], b[keys[i]])) {
      return false;
    }
  }

  return keys.length === Object.keys(b).length;
};

export default shallowEquals;
