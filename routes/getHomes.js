const homeSchema = require("../models/homes");
module.exports = {
	method: "GET",
	path: "/homes",
	handler: async (req, res) => {
		const pageOptions = {
			page: parseInt(req.query.page, 10) || 0,
			limit: parseInt(req.query.limit, 10) || 10
		}

		let findQuery = [];
		req.query.kind ? findQuery.push({kind: req.query.kind}): findQuery = findQuery;
		req.query.bedrooms ? findQuery.push({bedrooms: req.query.bedrooms}): findQuery = findQuery;
		req.query.bathrooms ? findQuery.push({bathrooms: req.query.bathrooms}): findQuery = findQuery;
		req.query.kitchen ? findQuery.push({kitchen: req.query.kitchen}): findQuery = findQuery;
		req.query.condition ? findQuery.push({condition: req.query.condition}): findQuery = findQuery;
		req.query.bargain ? findQuery.push({bargain: req.query.bargain}): findQuery = findQuery;

		if(findQuery.length > 0){
			try {
				const homes = await homeSchema.find({
					$and: findQuery
				}).skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit)
				return res.response(homes);
			} catch (error) {
				return res.response(error).code(500);
			}
		}else{
			try {
				const homes = await homeSchema.find().skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit)
				return res.response(homes);
			} catch (error) {
				return res.response(error).code(500);
			}
		}
	}
};