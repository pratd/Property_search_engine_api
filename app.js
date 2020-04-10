const Hapi = require('hapi');
const Joi = require("joi");
const Mongoose = require("mongoose");
// const userSchema = require("./models/user.js");
Mongoose.connect("mongodb://localhost/lookhaus", { useNewUrlParser: true , useUnifiedTopology: true });

// create new server instance
const server = new Hapi.Server({
	host: 'localhost',
	port: 3000
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
