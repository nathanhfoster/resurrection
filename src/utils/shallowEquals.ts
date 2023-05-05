
import isObjectLike from "./isObjectLike";

/**
 * This function chekcs for strict equality
 * @param {*} a - first value to compare
 * @param {*} b - second value to compare
 * @returns {boolean} - whether the two values are strictly equal or not
 * */
const is = <T = any>(a: T, b: T) => {
  // If they have the same reference
  if (a === b) {
    //@ts-ignore
    return a !== 0 || b !== 0 || 1 / a === 1 / b;
  }
  // Check if they are both NaN
  return a !== a && b !== b;
};

/**
 * This function does a shallow comparison on two objects
 * @param {*} a - first object to compare
 * @param {*} b - second object to compare
 * @returns {boolean} - whether the two objects are equal
 */
const shallowEquals = <T = any>(a: T, b: T) => {
  if (is(a, b)) {
    return true;
  }

  if (!isObjectLike(a) || !isObjectLike(b)) {
    return false;
  }

  const keys = Object.keys(a as Object);

  for (let i = 0; i < keys.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(b, keys[i]) ||
      //@ts-ignore
      !is(a[keys[i]], b[keys[i]])
    ) {
      return false;
    }
  }

  return keys.length === Object.keys(b as Object).length;
};

export default shallowEquals;
