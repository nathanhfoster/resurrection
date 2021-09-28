import { isFunctionType } from 'types';
/**
 * This evaluates wheter an object is a function or not
 * @param {*} object - any object
 * @returns {Boolean} - if the obejct is a boolean
 */

const isFunction: isFunctionType = (object) => object instanceof Function;

export default isFunction;
