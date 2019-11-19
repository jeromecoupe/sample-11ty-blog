// packages
const childProcess = require("child_process");

// Run Eleventy
function eleventyRun() {
  return childProcess.spawn("npx", ["eleventy", "--quiet"], {
    stdio: "inherit"
  });
}

module.exports = {
  run: eleventyRun
};
