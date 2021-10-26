/**
 * Blogposts collections
 * @param {*} collection
 * @returns published posts in reverse chronological order
 */

const now = new Date();

module.exports = function (collection) {
  return collection
    .getFilteredByGlob("./src/content/blogposts/*.md")
    .filter((item) => item.data.draft !== true && item.date <= now)
    .reverse();
};
