const homeSchema = require("../models/home");
module.exports = {
  method: "GET",
  path: "/homes",
  handler: async (req, res) => {
    const pageOptions = {
      page: null,
      limit: null,
    };

    let sorting = "-updated_at";

    req.query.page
      ? (pageOptions.page = parseInt(req.query.page, 10))
      : (pageOptions.page = pageOptions.page);
    req.query.limit
      ? (pageOptions.limit = parseInt(req.query.limit, 10))
      : (pageOptions.page = pageOptions.page);

    req.query.sort ? (sorting = "updated_at") : (sorting = sorting);
    let findQuery = [];

    req.query.kind
      ? findQuery.push({ kind: req.query.kind })
      : (findQuery = findQuery);
    req.query.bedrooms
      ? findQuery.push({ bedrooms: req.query.bedrooms })
      : (findQuery = findQuery);
    req.query.bathrooms
      ? findQuery.push({ bathrooms: req.query.bathrooms })
      : (findQuery = findQuery);
    req.query.kitchen
      ? findQuery.push({ kitchen: req.query.kitchen })
      : (findQuery = findQuery);
    req.query.condition
      ? findQuery.push({ condition: req.query.condition })
      : (findQuery = findQuery);
    req.query.price
      ? findQuery.push({ price: req.query.price })
      : (findQuery = findQuery);
    req.query.lift
      ? findQuery.push({ lift: req.query.lift })
      : (findQuery = findQuery);
    req.query.pets_allowed
      ? findQuery.push({ pets_allowed: req.query.pets_allowed })
      : (findQuery = findQuery);
    req.query.garden
      ? findQuery.push({ garden: req.query.garden })
      : (findQuery = findQuery);
    req.query.swimming_pool
      ? findQuery.push({ swimming_pool: req.query.swimming_pool })
      : (findQuery = findQuery);
    req.query.air_conditioning
      ? findQuery.push({ air_conditioning: req.query.air_conditioning })
      : (findQuery = findQuery);
    req.query.heating
      ? findQuery.push({ heating: req.query.heating })
      : (findQuery = findQuery);
    req.query.orientation
      ? findQuery.push({ orientation: req.query.orientation })
      : (findQuery = findQuery);
    req.query.energy_certificate
      ? findQuery.push({ energy_certificate: req.query.energy_certificate })
      : (findQuery = findQuery);
    req.query.bargain
      ? findQuery.push({ bargain: req.query.bargain })
      : (findQuery = findQuery);

    if (findQuery.length > 0) {
      try {
        const homes = await homeSchema
          .find({
            $and: findQuery,
          })
          .skip(pageOptions.page * pageOptions.limit)
          .limit(pageOptions.limit)
          .sort(sorting);
        return res.response(homes);
      } catch (error) {
        return res.response(error).code(500);
      }
    } else {
      try {
        const homes = await homeSchema
          .find()
          .skip(pageOptions.page * pageOptions.limit)
          .limit(pageOptions.limit)
          .sort(sorting);
        return res.response(homes);
      } catch (error) {
        return res.response(error).code(500);
      }
    }
  },
};
