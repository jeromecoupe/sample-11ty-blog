const moment = require("moment");
const now = new Date();

module.exports = function(eleventyConfig) {
  // published items
  // - don't have draft key set to true
  // - have a date smaller or equal to now
  const isPublished = (item) => {
    return item.data.draft !== true && item.date <= now;
  };

  // blogposts collection
  eleventyConfig.addCollection("blogposts", function(collection) {
    return collection
      .getFilteredByGlob("./src/blogposts/*.md")
      .filter(isPublished)
      .reverse();
  });

  // team collection
  eleventyConfig.addCollection("team", function(collection) {
    return collection.getFilteredByGlob("./src/team/*.md").sort((a, b) => {
      let nameA = a.data.surname.toUpperCase();
      let nameB = b.data.surname.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  });

  // limit filter
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // date filter
  eleventyConfig.addFilter("date", function(date, format, locale) {
    locale = locale ? locale : "en";
    moment.locale(locale);
    return moment(date).format(format);
  });

  // copy files
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/assets/img/");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts/");

  // override default config
  return {
    dir: {
      input: "./src/",
      output: "./dist/"
    }
  };
};
