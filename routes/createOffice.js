const fs = require("fs");
const server = require("../index.js");
const officeSchema = require("../models/office");

module.exports = {
  method: "POST",
  path: "/office/add",
  config: {
    auth: {
      strategy: "jwtokenization",
      scope: ["user"],
    },
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

      var office = new officeSchema({
        name: req.payload.name,
        photos: definitiveArray,
        description: req.payload.description,
        kind: req.payload.kind,
        location: req.payload.location,
        price: req.payload.price,
        lift: req.payload.lift,
        pets_allowed: req.payload.pets_allowed,
        air_conditioning: req.payload.air_conditioning,
        heating: req.payload.heating,
        floor: req.payload.floor,
        terrace: req.payload.terrace,
        energy_certificate: req.payload.energy_certificate,
        parking: req.payload.parking,
        bargain: req.payload.bargain,
        user_id: req.auth.credentials.id,
        user_username: req.auth.credentials.username,
        user_email: req.auth.credentials.user_email,
      });
      try {
        await office.save();
        return res.response("New office saved to database");
      } catch {
        return res.response("There was an error trying to create this office");
      }
    },
  },
};
