
/**
 * This function checks if a value is a comparable object
 * @param {*} value - first object to compare
 * @returns {Boolean} - whether the value is a comparable object or not
 */
const isObjectLike = (value: any): boolean => typeof value === 'object' && value !== null;


export default isObjectLike;