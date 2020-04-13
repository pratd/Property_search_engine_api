const userSchema = require("./models/user");
const Joi = require("joi");


module.exports = {
	name: 'ApiRoutes',
	register: async (server, options) => {
		server.route({
			method: "GET",
			path: "/",
			handler: async (req, res) => {
				return res.response('Welcome to Lookhaus\'s dark side!')
			}
		}),
		server.route({
			method: "GET",
			path: "/users",
			handler: async (req, res) => {
				try {
					const user = await userSchema.find().exec();
					return res.response(user);
				} catch (error) {
					return res.response(error).code(500);
				}
			}
		})


		// server.route({
		// 	method: "POST",
		// 	path: "/user",
		// 	options: {
		// 		validate: {
		// 			payload: {
		// 				userName: Joi.string().required(),
		// 				password: Joi.string().required(),
		// 				email: Joi.string().required(),
		// 				property_id: Joi.array().required(),
		// 				role: Joi.string().required()
		// 			},
		// 			failAction: (request, h, error) => {
		// 				return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();

		// 			}
		// 		}
		// 	},
		// 	handler: async (request, h) => {
		// 		try {
		// 			var user = new UserModel(request.payload);
		// 			var result = await user.save();
		// 			return h.response(result);
		// 		} catch (error) {
		// 			return h.response(error).code(500);
		// 		}
		// 	}
		// });
	}
}