/**
 *
 * @returns {String} - random string
 */
const getRandomString = () =>
  Math.random().toString(36).substring(7).split('').join('.')

export default getRandomString
