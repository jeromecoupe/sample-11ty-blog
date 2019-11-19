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
    options: {
      width: 1200,
      height: 675,
      fit: "cover"
    }
  },
  {
    src: "./src/assets/img/blog/*",
    dist: "./dist/assets/img/blog/1024x576/",
    options: {
      width: 1024,
      height: 576,
      fit: "cover"
    }
  },
  {
    src: "./src/assets/img/blog/*",
    dist: "./dist/assets/img/blog/800x450/",
    options: {
      width: 800,
      height: 450,
      fit: "cover"
    }
  },
  {
    src: "./src/assets/img/blog/*",
    dist: "./dist/assets/img/blog/600x600/",
    options: {
      width: 600,
      height: 600,
      fit: "cover"
    }
  }
];

// Create resized images
function generateThumbnails(done) {
  transforms.forEach(function(transform) {
    // if folder does not exist create it with all parent folders
    if (!fs.existsSync(transform.dist)) {
      fs.mkdirSync(transform.dist, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }

    // glob all files
    let files = glob.sync(transform.src);

    // for each file, apply transforms and save to file
    files.forEach(function(file) {
      let filename = path.basename(file);
      sharp(file)
        .resize(transform.options)
        .toFile(`${transform.dist}/${filename}`)
        .catch((err) => {
          console.log(err);
        });
    });
  });
  done();
}

module.exports = {
  thumbnails: generateThumbnails
};
