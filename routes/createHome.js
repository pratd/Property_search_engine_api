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
    handler: async (req, res) => {
      var home = new homeSchema({
        name: req.payload.name,
        description: req.payload.description,
        kind: req.payload.kind,
        location: req.payload.location,
        bedrooms: req.payload.bedrooms,
        bathrooms: req.payload.bathrooms,
        kitchen: req.payload.kitchen,
        condition: req.payload.condition,
        price: req.payload.price,
        lift: req.payload.lift,
        pets_allowed: req.payload.pets_allowed,
        garden: req.payload.garden,
        swimming_pool: req.payload.swimming_pool,
        air_conditioning: req.payload.air_conditioning,
        air_conditioning: req.payload.air_conditioning,
        heating: req.payload.heating,
        floor: req.payload.floor,
        orientation: req.payload.orientation,
        energy_certificate: req.payload.energy_certificate,
        parking: req.payload.parking,
        bargain: req.payload.bargain,
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
