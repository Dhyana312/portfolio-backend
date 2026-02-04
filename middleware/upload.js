const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "uploads";

    if (req.baseUrl.includes("blogs")) {
      folder = "uploads/blogs";
    } else if (req.baseUrl.includes("certificates")) {
      folder = "uploads/certificates";
    } else if (req.baseUrl.includes("research")) {
      folder = "uploads/research";
    }

    // ✅ CREATE FOLDER IF NOT EXISTS
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});


module.exports = upload;
