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
    handler: async (req, res) => {
      const data = req.payload;

      // console.log(req.payload.photos);
      if (data.photos) {
        const name = data.photos.hapi.filename;
        const path = __dirname + "/../uploads/" + name;
        const file = fs.createWriteStream(path);

        file.on("error", (err) => console.error(err));

        data.photos.pipe(file);

        data.photos.on("end", (err) => {
          const ret = {
            filename: data.photos.hapi.filename,
            headers: data.photos.hapi.headers,
          };
          return JSON.stringify(ret);
        });
      }

      var home = new homeSchema({
        name: data.name,
        photos: server.info.uri + "/uploads/" + data.photos.hapi.filename,
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
