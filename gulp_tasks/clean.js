// packages
const del = require("del");

// clean dist folder
function clean() {
  return del(["./dist/"]);
}

module.exports = {
  clean
};
