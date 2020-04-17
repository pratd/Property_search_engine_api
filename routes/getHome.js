const homeSchema = require("../models/homes");
module.exports = {
	method: "GET",
	path: "/home/{id}",
	handler: async (req, res) => {
		const homeId = req.params.id;
		try {
			const property = await homeSchema.findById(homeId).exec()
			return res.response(property);
		} catch (error) {
			return res.response(error).code(500);
		}
	}
};