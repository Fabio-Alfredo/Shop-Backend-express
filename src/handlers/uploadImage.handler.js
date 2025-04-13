const admin = require("../configs/firebase.config");

const bucket = admin.storage().bucket();

const uploadImage = async (image, path) => {
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
};

module.exports = uploadImage;
