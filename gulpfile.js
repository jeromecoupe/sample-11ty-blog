// required packages
const gulp = require("gulp");

// import tasks (CommonJS)
const server = require("./gulp_tasks/server.js");
const clean = require("./gulp_tasks/clean.js");
const styles = require("./gulp_tasks/styles.js");
const scripts = require("./gulp_tasks/scripts.js");
const eleventy = require("./gulp_tasks/eleventy.js");
const images = require("./gulp_tasks/images.js");

// watch all files
function watchFiles() {
  gulp.watch("./src/assets/scss/**/*", styles.build);
  gulp.watch("./src/assets/js/**/*", scripts.build);
  gulp.watch("./src/assets/img/**/*", images.thumbnails);
  gulp.watch(
    [
      "./.eleventy.js",
      "./src/**/*",
      "!./src/assets/js/**/*",
      "!./src/assets/scss/**/*"
    ],
    eleventy.run
  );
}

// define complex tasks
const watch = gulp.parallel(server.init, watchFiles);
const build = gulp.series(
  clean.dist,
  gulp.parallel(images.thumbnails, styles.build, scripts.build, eleventy.run)
);

// export tasks to CLI
exports.build = build;
exports.default = build;
exports.watch = watch;
