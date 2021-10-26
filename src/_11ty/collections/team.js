/**
 * Team collection
 * @param {*} collection
 * @returns team collection ordered by surname
 */

module.exports = function (collection) {
  return collection
    .getFilteredByGlob("./src/content/team/*.md")
    .sort((a, b) => {
      return a.data.surname.localeCompare(b.data.surname);
    });
};
