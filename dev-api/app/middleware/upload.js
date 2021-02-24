const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "app/grantUploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype == "application/msword" ||
      file.mimetype == "application/vnd.ms-powerpoint" ||
      file.mimetype == "application/vnd.ms-excel" ||
      file.mimetype == "text/csv" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "application/pdf" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      callback(null, true);
    } else {
      console.log("Invalid File Type");
      callback(null, false);
    }
  },
});

module.exports = upload;
