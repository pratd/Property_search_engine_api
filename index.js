require("dotenv").config();
const Hapi = require("hapi");
const Mongoose = require("mongoose");
const Boom = require("boom");
const glob = require("glob");
const path = require("path");
const secret = process.env.SECRET;
require("dotenv").config();
Mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// create new server instance
const server = new Hapi.Server({
  // debug: { request: ['error'] },
  host: process.env.HOST,
  port: process.env.PORT || 3000,
  routes: {
    cors: {
      origin: ["*"],
      headers: ["Accept", "Content-Type"],
      additionalHeaders: ["X-Requested-With"],
    },
  },
});
//SERVER BOOTUP
const bootUpServer = async () => {
  await server.register(require("hapi-auth-jwt2"));

  server.auth.strategy("jwtokenization", "jwt", {
    key: secret,
    verify: { algorithms: ["HS256"] },
  });
  //get default auth
  //server.auth.default('jwt');
  //get all the routes in the subdirectory of routes
  glob
    .sync("routes/*.js", {
      root: __dirname,
    })
    .forEach((file) => {
      const route = require(path.join(__dirname, file));
      server.route(route);
    });
  await server.start();
  console.log(`Server is running at ${server.info.uri}`);
  process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
  });
};
bootUpServer();

module.exports = server;
