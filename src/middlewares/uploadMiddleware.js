const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "event_images", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports = upload;
