require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Mongoose = require("mongoose");
const Boom = require('boom');
const glob = require('glob');
const path = require('path');
const secret = require('./config');
const Inert = require('@hapi/inert');
require('dotenv').config()
Mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex:true });
// create new server instance
const server = new Hapi.Server({
	// debug: { request: ['error'] },
	host: process.env.HOST,
	port: process.env.PORT || 3000,
	"routes": {
        "cors": {
			origin: ["*"],
            headers: ["Accept", "Content-Type"],
			additionalHeaders: ["X-Requested-With"]
		}
	}
});
//validator
const validator = (decoded, request, callback) => {
	// This is a simple check that the `sub` claim
	// exists in the access token. 
	if (decoded && decoded.sub) {
	  return callback(null, true, {});
	}
  
	return callback(null, false, {});
  }
//SERVER BOOTUP
const bootUpServer = async () => {
	
	await server.register([require('hapi-auth-jwt2'), Inert]);
	
	server.auth.strategy('jwtokenization','jwt',{
		key: secret,
		verify: {algorithms: ['HS256']},
		validate: validator
	});
	//get default auth
	//server.auth.default('jwt');
	//get all the routes in the subdirectory of routes
	glob.sync('routes/*.js',{
		root: __dirname
	}).forEach(file=>{
		const route = require(path.join(__dirname, file));
		server.route(route);
	});
	await server.start();
	console.log(`Server is running at ${server.info.uri}`);
	process.on('unhandledRejection', (err) => {
		console.log(err);
		process.exit(1);
	});
};
bootUpServer();

module.exports = server;
