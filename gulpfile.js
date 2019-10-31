// required packages
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");
const gulp = require("gulp");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const childProcess = require("child_process");
const del = require("del");
const browsersync = require("browser-sync").create();

// browsersync server
function server(done) {
  browsersync.init({
    server: "./dist/",
    files: [
      "./dist/assets/css/main.min.css",
      "./dist/assets/js/bundle.min.js",
      "./dist/*.{html, xml}",
      "./dist/**/*.{html, xml}"
    ],
    port: 3000,
    open: false
  });
  done();
}

// clean dist folder
function clean() {
  return del(["./dist/"]);
}

// build styles (sass)
function stylesBuild() {
  return gulp
    .src("./src/assets/scss/main.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./dist/assets/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./dist/assets/css/"));
}

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

// Run Eleventy
function eleventyBuild() {
  return childProcess.spawn("npx", ["eleventy", "--quiet"], {
    stdio: "inherit"
  });
}

// watch all files
function watchFiles() {
  gulp.watch("./src/assets/scss/**/*", stylesBuild);
  gulp.watch("./src/assets/js/**/*", scriptsBuild);
  gulp.watch(
    [
      "./.eleventy.js",
      "./src/**/*",
      "!./src/assets/js/**/*",
      "!./src/assets/scss/**/*"
    ],
    eleventyBuild
  );
}

const watch = gulp.parallel(server, watchFiles);
const build = gulp.series(
  clean,
  gulp.parallel(stylesBuild, scriptsBuild, eleventyBuild)
);

exports.build = build;
exports.default = build;
exports.watch = watch;
