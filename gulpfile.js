// required packages
const gulp = require("gulp");

// import tasks (CommonJS)
const server = require("./gulp_tasks/server.js").server;
const clean = require("./gulp_tasks/clean.js").clean;
const styles = require("./gulp_tasks/styles.js").styles;
const scripts = require("./gulp_tasks/scripts.js").scripts;
const eleventy = require("./gulp_tasks/eleventy.js").eleventy;
const images = require("./gulp_tasks/images.js").imageTransforms;

// watch all files
function watchFiles() {
  gulp.watch("./src/assets/scss/**/*", styles);
  gulp.watch("./src/assets/js/**/*", scripts);
  gulp.watch("./src/assets/img/**/*", images);
  gulp.watch(
    [
      "./.eleventy.js",
      "./src/**/*",
      "!./src/assets/js/**/*",
      "!./src/assets/scss/**/*"
    ],
    eleventy
  );
}

// define complex tasks
const watch = gulp.parallel(server, watchFiles);
const build = gulp.series(
  clean,
  gulp.parallel(images, styles, scripts, eleventy)
);

// export tasks to CLI
exports.build = build;
exports.default = build;
exports.watch = watch;
