module.exports = function (eleventyConfig) {
  // Collections
  eleventyConfig.addCollection(
    "blogposts",
    require("./src/_11ty/collections/blogposts.js")
  );

  eleventyConfig.addCollection(
    "team",
    require("./src/_11ty/collections/team.js")
  );

  // Filters
  eleventyConfig.addFilter("limit", require("./src/_11ty/filters/limit.js"));
  eleventyConfig.addFilter("date", require("./src/_11ty/filters/date.js"));

  // copy files
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts/");
  eleventyConfig.addPassthroughCopy("./src/assets/img/");

  // override default config
  return {
    dir: {
      input: "./src/",
      output: "./dist/",
    },
  };
};
