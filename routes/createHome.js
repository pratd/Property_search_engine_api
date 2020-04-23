const fs = require("fs");
const server = require("../index.js");
const homeSchema = require("../models/home");
const UserSchema = require("../models/user");
const path = require("path");
const getPhotoArray = require("../util/getPhotos").getPhotos;

module.exports = {
  method: "POST",
  path: "/home/add",
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

    //!This handler needs refactor
    handler: async (req, res) => {
      const data = req.payload;
      const definitiveArray = await getPhotoArray(req);
      var home = new homeSchema({
        name: data.name,
        photos: definitiveArray,
        description: data.description,
        kind: data.kind,
        // location: data.location,
        street: req.payload.street,
        city: req.payload.city,
        postalcode: req.payload.postalcode,
        country: req.payload.country,
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
        heating: data.heating,
        floor: data.floor,
        orientation: data.orientation,
        energy_certificate: data.energy_certificate,
        parking: data.parking,
        bargain: data.bargain,
        user_id: req.auth.credentials.id,
        user_username: req.auth.credentials.username,
        user_email: req.auth.credentials.user_email,
      });
      try {
        await home.save();
        let previousProperies = await UserSchema.findById(
          req.auth.credentials.id
        );
        previousProperies = previousProperies.property_ids;
        previousProperies.push(home.id);

        await UserSchema.findByIdAndUpdate(
          { _id: req.auth.credentials.id },
          {
            property_ids: previousProperies,
          }
        );
        return res.response("New home saved to database");
      } catch {
        return res.response("There was an error trying to create this home");
      }
    },
  },
};
