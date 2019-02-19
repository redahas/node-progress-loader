const CONSTANTS = require('./constants');

/**
 * Creates left padded string
 * @param {String}  str
 * @param {Int} length
 * @return {String}
 */
const padStringLeft = (str, length) => (
  String(`${CONSTANTS.SPACE_CHAR.repeat(length)}${str}`)
    .slice(length * -1)
);

/**
 * Creates right padded string
 * @param {String}  str
 * @param {Int} length
 * @return {String}
 */
const padStringRight = (str, length) => (
  String(`${str}${CONSTANTS.SPACE_CHAR.repeat(length)}`)
    .substring(0, length)
);

module.exports = {
  padStringLeft,
  padStringRight,
};