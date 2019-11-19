// packages
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");

// JS scripts (webpack: transpile, lint, minify)
function scriptsBuild() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      const info = stats.toJson();

      if (err) {
        return reject(err);
      }

      if (stats.hasErrors()) {
        return reject(info.errors);
      }

      if (stats.hasWarnings()) {
        return reject(info.warnings);
      }

      console.log(
        stats.toString({
          chunks: false,
          colors: true
        })
      );

      resolve();
    });
  });
}

module.exports = {
  build: scriptsBuild
};
