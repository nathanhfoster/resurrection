/**
 * This evaluates wheter an object is a function or not
 * @param {*} object - any object
 * @returns {Boolean} - if the obejct is a boolean
 * */

const isFunction = object => object instanceof Function || typeof object === 'function'

export default isFunction
