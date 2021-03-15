/**
 * This function does a shallow comparison on two objects
 * @param {Object} a - first object to compare
 * @param {Object} b - second object to compare
 * @returns {Boolean} - whether the two objects are equal or not
 * */

const shallowEquals = (a, b) => {
  if (a === b) return true
  if (!(a || b)) return true

  const aKeys = Object.keys(a)
  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i]
    if (!(key in b) || a[key] !== b[key]) {
      return false
    }
  }

  const bKeys = Object.keys(b)
  for (let i = 0; i < bKeys.length; i++) {
    const key = bKeys[i]
    if (!(key in a) || a[key] !== b[key]) {
      return false
    }
  }
  return true
}

export default shallowEquals
