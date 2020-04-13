const Hapi = require('hapi');
const routes = require("./routes");
const Mongoose = require("mongoose");

require('dotenv').config()
Mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true });

// create new server instance
const server = new Hapi.Server({
	host: process.env.HOST,
	port: process.env.PORT || 3000
})



//SERVER BOOTUP
const bootUpServer = async () => {
	await server.register(routes);
	await server.start();
	console.log(`Server is running at ${server.info.uri}`);
	process.on('unhandledRejection', (err) => {
		console.log(err);
		process.exit(1);
	})
}
bootUpServer();


module.exports = server;