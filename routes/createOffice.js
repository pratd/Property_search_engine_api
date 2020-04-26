const fs = require("fs");
const server = require("../index.js");
const officeSchema = require("../models/office");
const UserSchema = require("../models/user");
const path = require("path");
const getPhotoArray = require("../util/getPhotos").getPhotos;
const createOfficeSchema = require("../schemas/createOffice").createOfficeSchema;
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
      let definitiveArray = await Promise.resolve(getPhotoArray(req));
      const readFile = util.promisify(fs.readFile);
      //TODO: handling images
      if(definitiveArray){
        if (!Array.isArray(definitiveArray)) {
          definitiveArray = [definitiveArray];
        }
        const photoArray =[];
        for (const photo of definitiveArray) {
          const read = await readFile(photo.path);
          photoArray.push(read);
        }
        //* creating a new OFFICE
        let office = new officeSchema();
        office.name = data.name;
        photoArray.forEach(img => {
          office.photos.push({
            photo:{
              data: img,
              contentType:data.photos.mimeType
            }
          });
        });
        office.kind = data.kind;
        office.street = data.street;
        office.city = data.city;
        office.postalcode = data.postalcode;
        office.country = data.country;
        office.price = data.price;
        office.lift = data.lift;
        office.pets_allowed = data.pets_allowed;
        office.air_conditioning = data.air_conditioning;
        office.heating = data.heating;
        office.floor = data.floor;
        office.terrrace = data.terrace;
        office.energy_certificate= data.energy_certificate;
        office.parking= data.parking;
        office.bargain= data.bargain;
        office.user_id= req.auth.credentials.id;
        office.user_username= req.auth.credentials.username;
        office.user_email= req.auth.credentials.user_email;
        try {
          await office.save();
          let previousProperties = await UserSchema.findById(
            req.auth.credentials.id
          );
          previousProperties = previousProperties.property_ids;
          previousProperties.push(office.id);
          await UserSchema.findByIdAndUpdate(
            { _id: req.auth.credentials.id },
            {
              property_ids: previousProperties,
            }
          );
          return res.response("New office saved to database");
        } catch(err) {
          return res.response("There was an error trying to create this office");
        }
      }
    },
    validate: {
      payload: createOfficeSchema,
      //! show the error returned in the fields for POSTMAN
      failAction: (request, h, err) => {
        return err;
      },
    },
  },
};
