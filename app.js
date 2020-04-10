const Hapi = require('hapi');
// const Joi = require("joi");
const Mongoose = require("mongoose");
const userSchema = require("./models/user");
require('dotenv').config()
Mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true });

// create new server instance
const server = new Hapi.Server({
	host: 'localhost',
	port: 3000
})



server.route({
	method: "GET",
	path: "/users",
	handler: async (request, h) => {
		try {
            const user = await userSchema.find().exec();
            return h.response(user);
        } catch (error) {
            return h.response(error).code(500);
        }
	}
})



//SERVER BOOTUP
const bootUpServer = async () => {
	await server.start();
	console.log(`Server is running at ${server.info.uri}`);
	process.on('unhandledRejection', (err) => {
		console.log(err);
		process.exit(1);
	})
}
bootUpServer();


module.exports = server;