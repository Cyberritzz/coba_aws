const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const [type, ext] = file.mimetype.split("/");

    if (type === "application") {
      cb(null, "public/uploads/rar");
    } else if (type === "image") {
      cb(null, "public/uploads/thumbnail");
    }
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(
        null,
        raw.toString("hex") + Date.now() + path.extname(file.originalname)
      );
    });
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // limit to 2MB
  // Middleware multer
  fileFilter: function (req, file, cb) {
    var allowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/zip",
      "application/vnd.rar",
      "application/x-compressed",
      "application/x-zip-compressed"
    ];
    console.log(file.mimetype)
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error("Unsupported file format");
      error.status = 400; // Atur status error ke 400 (Bad Request) atau sesuai kebutuhan
      cb(error, false);
    }
  },
});

module.exports = upload;
