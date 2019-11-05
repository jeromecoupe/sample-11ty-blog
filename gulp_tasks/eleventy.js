// packages
const childProcess = require("child_process");

// Run Eleventy
function eleventyBuild() {
  return childProcess.spawn("npx", ["eleventy", "--quiet"], {
    stdio: "inherit"
  });
}

module.exports = {
  eleventy: eleventyBuild
};
