const server = require("../index.js").server;
const s3 = require("../index.js").s3;
const getPhotoArray = require("../util/getPhotos").getPhotos;
require("dotenv").config();

const util = require("util");

const fs = require("fs");
const AWS = require("aws-sdk");

module.exports = {
  method: "POST",
  path: "/upload-test",
  config: {
    payload: {
      output: "stream",
      parse: true,
      allow: [
        "application/json",
        "multipart/form-data",
        "image/jpeg",
        "application/pdf",
        "application/x-www-form-urlencoded",
      ],
      multipart: true,
      maxBytes: 1024 * 1024 * 100,
      timeout: false,
    },

    handler: (req, res) => {
      async function prattyaman() {
        const readFile = util.promisify(fs.readFile);
        const definitiveArray = await getPhotoArray(req);
        // console.log(definitiveArray, "definitiveArray");
        const read = await readFile(definitiveArray.path);

        const params = {
          Bucket: "cloud-cube-eu", // pass your bucket name
          Key:
            process.env.CLOUDCUBE_BUCKET +
            "/public/" +
            req.payload.photos.hapi.filename, // file will be saved as testBucket/contacts.csv
          // ContentType: ".jpg",
          Body: JSON.stringify(read, null, 2),
        };

        // const s3Upload = util.promosify(s3.upload);
        const s3UploadConst = await s3.upload(params, read);
        console.log(`File uploaded successfully at ${s3UploadConst.Location}`);
        // s3.upload(params, function (s3Err, data) {
        // 	if (s3Err) throw s3Err;
        // 	console.log(`File uploaded successfully at ${data.Location}`);
        // });

        // fs.readFile(req.payload.photos, (err, data) => {
        //   if (err) throw err;
        //   const params = {
        //     Bucket: process.env.CLOUDCUBE_BUCKET, // pass your bucket name
        //     Key: "/public/" + req.payload.photos, // file will be saved as testBucket/contacts.csv
        //     Body: JSON.stringify(data, null, 2),
        //   };
        //   s3.upload(params, function (s3Err, data) {
        //     if (s3Err) throw s3Err;
        //     console.log(`File uploaded successfully at ${data.Location}`);
        //   });
      }
      prattyaman();
      return res.response("Success!!");
    },
  },
};
