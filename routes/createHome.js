const fs = require("fs");
const server = require("../index.js");
const homeSchema = require("../models/home");
const UserSchema = require("../models/user");
const path = require("path");
const getPhotoArray = require("../util/getPhotos").getPhotos;
const createHomeSchema= require("../schemas/createHouse").createHouseSchema;
const util = require("util");

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
      let definitiveArray = await Promise.resolve(getPhotoArray(req));
      //TODO handling images
      const readFile = util.promisify(fs.readFile);
      if(definitiveArray){
        if (!Array.isArray(definitiveArray)) {
          definitiveArray = [definitiveArray];
        }
        const photoArray =[];
        for (const photo of definitiveArray) {
          const read = await readFile(photo.path);
          photoArray.push(read);
        }
        //* creating a new HOME
        let home = new homeSchema();
        home.name = data.name;
        home.description=data.description;
        photoArray.forEach(img => {
          home.photos.push({
            photo:{
              data: img,
              contentType:data.photos.mimeType
            }
          });
        });
        home.kind = data.kind;
        home.street = data.street;
        home.city = data.city;
        home.postalcode = data.postalcode;
        home.country = data.country;
        home.bedrooms = data.bedrooms;
        home.bathrooms = data.bathrooms;
        home.kitchen = data.kitchen;
        home.condition = data.condition;
        home.price = data.price;
        home.lift = data.lift;
        home.pets_allowed = data.pets_allowed;
        home.garden = data.garden;
        home.swimming_pool = data.swimming_pool;
        home.air_conditioning = data.air_conditioning;
        home.heating = data.heating;
        home.floor = data.floor;
        home.orientation = data.orientation;
        home.energy_certificate= data.energy_certificate;
        home.parking= data.parking;
        home.bargain= data.bargain;
        home.user_id= req.auth.credentials.id;
        home.user_username= req.auth.credentials.username;
        home.user_email= req.auth.credentials.user_email;
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
        } catch(err) {
          return res.response("There was an error trying to create this home");
        }
      }
    },
    validate: {
      payload: createHomeSchema,
      //! show the error returned in the fields for POSTMAN
      failAction: (request, h, err) => {
        return err;
      },
    },
  }
};
