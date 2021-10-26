// packages
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const sharp = require("sharp");

// specify transforms
const transforms = [
  {
    src: "./src/assets/img/blog/*",
    dist: "./dist/assets/img/blog/1200x675/",
    formats: ["jpg"],
    options: {
      width: 1200,
      height: 675,
      fit: "cover",
    },
  },
  {
    src: "./src/assets/img/blog/*",
    dist: "./dist/assets/img/blog/1024x576/",
    formats: ["jpg"],
    options: {
      width: 1024,
      height: 576,
      fit: "cover",
    },
  },
  {
    src: "./src/assets/img/blog/*",
    dist: "./dist/assets/img/blog/800x450/",
    formats: ["jpg"],
    options: {
      width: 800,
      height: 450,
      fit: "cover",
    },
  },
  {
    src: "./src/assets/img/blog/*",
    dist: "./dist/assets/img/blog/600x600/",
    formats: ["jpg"],
    options: {
      width: 600,
      height: 600,
      fit: "cover",
    },
  },
];

/**
 * Check supplied format is allowed
 * @param {string} format
 */
function checkFormats(format) {
  const allowedFormats = ["jpg", "jpeg", "png", "webp", "avif"];

  if (!allowedFormats.includes(format)) {
    throw new Error(`${format} is not an allowed format: ${allowedFormats}`);
  }
}

/**
 * Create Directory recursively if not readable
 * @param {string} path - valid dir path
 */
function createDir(path) {
  if (fs.existsSync(path)) return;

  fs.mkdirSync(path, { recursive: true }, (err) => {
    if (err) throw err;
  });
}

/**
 * Resize Image
 * @param {string} scrPath - path of src image
 * @param {string} distPath - path of dist image
 * @param {format} format - format of dist image
 * @param {object} resizeOptions - Sharp resize options
 */
function resizeImage(scrPath, distPath, format, resizeOptions) {
  if (fs.existsSync(distPath)) return;
  resizeOptions.width ? parseInt(resizeOptions.width, 10) : null;
  resizeOptions.height ? parseInt(resizeOptions.height, 10) : null;

  sharp(scrPath)
    .toFormat(format)
    .resize(resizeOptions)
    .toFile(distPath)
    .catch((err) => {
      throw new Error(err);
    });
}

function init() {
  transforms.forEach((transform) => {
    // create dist folder
    createDir(transform.dist);

    // glob all files
    let srcPaths = glob.sync(transform.src);

    // loop through files
    srcPaths.forEach((sourcePath) => {
      // get formats
      let formats = transform.formats;
      if (!Array.isArray(formats)) {
        throw new Error(`${formats} must be an array`);
      }

      // loop through formats
      formats.forEach((format) => {
        // check for allowed formats
        checkFormats(format);

        // get filename and output path
        let inputFilename = path.parse(sourcePath).name;
        let outputPath = path.normalize(
          `${transform.dist}/${inputFilename}.${format}`
        );

        // resize images
        resizeImage(sourcePath, outputPath, format, transform.options);
      });
    });
  });
}

module.export = init();
