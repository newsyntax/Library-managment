const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + Math.random();
    const extention = path.extname(file.originalname);

    const validFormats = [".jpg", ".png", ".jpeg"];

    if (validFormats.includes(extention)) {
      cb(null, `${fileName}${extention}`);
    } else {
      cb(new Error("format not accepted"));
    }
  },
});

const uploader = multer({
  storage,
  limits: {
    fileSize: 3 * 1000 * 1000,
  },
});

module.exports = uploader;
