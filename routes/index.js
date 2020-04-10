const server = require('../models/user');
const Joi = require("joi");

server.route({
	method: "POST",
	path: "/user",
	options: {
		validate: {
			payload: {
				userName: Joi.string().required(),
				password: Joi.string().required(),
				email: Joi.string().required(),
				property_id: Joi.array().required(),
				role: Joi.string().required()
			},
			failAction: (request, h, error) => {
				return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();

			}
		}
	},
	handler: async (request, h) => {
		try {
			var user = new UserModel(request.payload);
			var result = await user.save();
			return h.response(result);
		} catch (error) {
			return h.response(error).code(500);
		}
	}
});