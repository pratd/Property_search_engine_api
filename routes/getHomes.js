const homeSchema = require("../models/homes");
module.exports = {
	method: "GET",
	path: "/homes",
	handler: async (req, res) => {
		let findQuery = [];

		req.query.kind ? findQuery.push({kind: req.query.kind}): findQuery = findQuery;
		req.query.bedrooms ? findQuery.push({bedrooms: req.query.bedrooms}): findQuery = findQuery;
		req.query.bathrooms ? findQuery.push({bathrooms: req.query.bathrooms}): findQuery = findQuery;
		req.query.kitchen ? findQuery.push({kitchen: req.query.kitchen}): findQuery = findQuery;
		req.query.condition ? findQuery.push({condition: req.query.condition}): findQuery = findQuery;


		try {
			const homes = await homeSchema.find({
				$and: findQuery
			});
			return res.response(homes);
		} catch (error) {
			return res.response(error).code(500);
		}
	}
};