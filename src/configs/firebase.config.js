const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");
const config = require("./config");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.storage_bucket,
  });
}
