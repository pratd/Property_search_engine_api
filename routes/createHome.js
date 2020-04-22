const fs = require("fs");
const server = require("../index.js");
const homeSchema = require("../models/homes");
require("dotenv").config();
const secretKey = process.env.SECRET;

module.exports = {
  method: "POST",
  path: "/home/add",
  config: {
    // auth: {
    //   strategy: "jwtokenization",
    //   scope: ["user"],
    // },
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
      //   multipart: true,
      maxBytes: 1024 * 1024 * 100,
      timeout: false,
    },

    //!This handler needs refactor
    handler: async (req, res) => {
      const data = req.payload;

      const photosArray = [];

      if (data.photos) {
        if (!Array.isArray(data.photos)) {
          data.photos = [data.photos];
        }
        data.photos.forEach((photo) => {
          const phototoSave = {
            name: photo.hapi.filename,
            path: __dirname + "/../uploads/" + photo.hapi.filename,
          };
          photosArray.push(phototoSave);
          const file = fs.createWriteStream(
            __dirname + "/../uploads/" + photo.hapi.filename
          );
          file.on("error", (err) => console.error(err));
          photo.pipe(file);
          photo.on("end", (err) => {
            const ret = [
              {
                filename: photo.hapi.filename,
                headers: photo.hapi.headers,
              },
            ];
            return JSON.stringify(ret);
          });
        });
      }

      let photosArrayToSave = photosArray.map((photo) => {
        return photo.name;
      });

      const definitiveArray = [];

      photosArrayToSave = photosArrayToSave.forEach((filename) => {
        definitiveArray.push(`${server.info.uri}/uploads/${filename}`);
      });

      var home = new homeSchema({
        name: data.name,
        photos: definitiveArray,
        description: data.description,
        kind: data.kind,
        location: data.location,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        kitchen: data.kitchen,
        condition: data.condition,
        price: data.price,
        lift: data.lift,
        pets_allowed: data.pets_allowed,
        garden: data.garden,
        swimming_pool: data.swimming_pool,
        air_conditioning: data.air_conditioning,
        air_conditioning: data.air_conditioning,
        heating: data.heating,
        floor: data.floor,
        orientation: data.orientation,
        energy_certificate: data.energy_certificate,
        parking: data.parking,
        bargain: data.bargain,
      });
      try {
        await home.save();
        return res.response("New home saved to database");
      } catch {
        return res.response("There was an error trying to create this home");
      }
    },
  },
};
