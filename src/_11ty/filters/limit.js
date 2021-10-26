/**
 * Limit filter
 *
 * @param {*} array
 * @param {*} limit
 * @returns sliced array
 */

module.exports = function (array, limit) {
  return array.slice(0, limit);
};
