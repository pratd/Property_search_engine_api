const fs = require("fs");
const server = require("../index.js");
const officeSchema = require("../models/office");
const UserSchema = require("../models/user");
const path = require("path");
const getPhotoArray = require("../util/getPhotos").getPhotos;
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
      const definitiveArray = await getPhotoArray(req);

      var office = new officeSchema({
        name: req.payload.name,
        photos: definitiveArray,
        description: req.payload.description,
        kind: req.payload.kind,
        street: req.payload.street,
        city: req.payload.city,
        postalcode: req.payload.postalcode,
        country: req.payload.country,
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
        let previousProperties = await UserSchema.findById(
          req.auth.credentials.id
        );

        previousProperties = previousProperties.offices_ids;
        previousProperties.push(office.id);

        await UserSchema.findByIdAndUpdate(
          { _id: req.auth.credentials.id },
          {
            offices_ids: previousProperties,
          }
        );
        return res.response("New office saved to database");
      } catch {
        return res.response("There was an error trying to create this office");
      }
    },
  },
};
