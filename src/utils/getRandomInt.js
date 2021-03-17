/**
 * This functions returns a random integer within a specified range
 * @param {Number} min - the lower limit of the integer
 * @param {Number} max - the upper limit of the integer
 * @returns {Number} - random integer
 */

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export default getRandomInt
