const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const uploadCloud = (filesToUpload) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filesToUpload, (error, result) => {
      if (error) {
        reject(error.message);
      }
      resolve({ url: result.secure_url }, { resource_type: "auto" });
    });
  });
};

module.exports = uploadCloud;
