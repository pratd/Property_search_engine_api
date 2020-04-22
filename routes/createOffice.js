const officeSchema = require("../models/office");

module.exports = {
  method: "POST",
  path: "/office/add",
  config: {
    auth: {
      strategy: "jwtokenization",
      scope: ["user"],
    },
    handler: async (req, res) => {
      var office = new officeSchema({
        name: req.payload.name,
        photos: req.payload.photos,
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
