// packages
const browsersync = require("browser-sync").create();

// browsersync server
function initServer(done) {
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

module.exports = {
  init: initServer
};
