// packages
const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");

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

module.exports = {
  build: stylesBuild
};
