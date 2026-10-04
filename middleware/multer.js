const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + Math.random();
    const extention = path.extname(file.originalname);
    cb(null, `${fileName}${extention}`);
  },
});

const uploader = multer({
  storage,
  limits: {
    fileSize: 3 * 1000 * 1000,
  },
});

module.exports = uploader;
