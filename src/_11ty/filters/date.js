/**
 * Date filter
 *
 * @param {*} date
 * @param {*} format
 * @param {*} locale
 * @returns date foratted with moment.js
 */

const moment = require("moment");

module.exports = function (date, format, locale = "en") {
  moment.locale(locale);
  return moment(date).format(format);
};
