const admin = require("../configs/firebase.config");

const bucket = admin.storage().bucket();

const uploadImage = async (images, path) => {
  const files = Array.isArray(images) ? images : [images];

  const urls = await Promise.all(
    files.map(async (image) => {
      const remotePath = `${path}/${image.name}${Date.now()}`;
      const file = bucket.file(remotePath);
      await file.save(image.data, {
        metadata: {
          contentType: image.mimetype,
        },
      });
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });
      return url;
    })
  );

  return urls;
};

module.exports = uploadImage;
