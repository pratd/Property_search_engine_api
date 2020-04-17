const officeSchema = require("../models/office");
module.exports = {
	method: "GET",
	path: "/offices",
	handler: async (req, res) => {
		const pageOptions = {
			page: parseInt(req.query.page, 10) || 0,
			limit: parseInt(req.query.limit, 10) || 10
		}

		//! Missing time published filter
		let findQuery = [];
		req.query.kind ? findQuery.push({kind: req.query.kind}): findQuery = findQuery;
		req.query.price ? findQuery.push({price: req.query.price}): findQuery = findQuery;
		req.query.lift ? findQuery.push({lift: req.query.lift}): findQuery = findQuery;
		req.query.pets_allowed ? findQuery.push({pets_allowed: req.query.pets_allowed}): findQuery = findQuery;
		req.query.terrace ? findQuery.push({terrace: req.query.terrace}): findQuery = findQuery;
		req.query.bargain ? findQuery.push({bargain: req.query.bargain}): findQuery = findQuery;

		if(findQuery.length > 0){
			try {
				const offices = await officeSchema.find({
					$and: findQuery
				}).skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit)
				return res.response(offices);
			} catch (error) {
				return res.response(error).code(500);
			}
		}else{
			try {
				const offices = await officeSchema.find().skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit)
				return res.response(offices);
			} catch (error) {
				return res.response(error).code(500);
			}
		}
	}
};