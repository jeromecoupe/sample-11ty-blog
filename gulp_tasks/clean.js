// packages
const del = require("del");

// clean dist folder
function cleanDist() {
  return del(["./dist/"]);
}

module.exports = {
  dist: cleanDist
};
