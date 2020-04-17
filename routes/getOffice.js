const officeSchema = require("../models/office");
module.exports = {
	method: "GET",
	path: "/office/{id}",
	handler: async (req, res) => {
		const officeId = req.params.id;
		try {
			const property = await officeSchema.findById(officeId).exec()
			return res.response(property);
		} catch (error) {
			return res.response(error).code(500);
		}
	}
};