require('dotenv').config();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

// single file upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'exmap-s3-bucket',
    acl: 'public-read-write',
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
});

module.exports = upload;