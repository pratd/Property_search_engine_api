const Boom = require("boom");
const User = require("../models/user");
const authenticateUserSchema = require("../schemas/authenticateUser");
const verifyCredentials = require("../util/userFunctions").verifyCredentials;
const createToken = require("../util/token");

module.exports = {
  method: "POST",
  path: "/login/users",
  config: {
    //check user's password against DB
    pre: [{ method: verifyCredentials, assign: "user" }],
    handler: async (req, res) => {
      //if the password is correct we issue a token
      // if incorrect, the error will bubble up from the pre method
      return res
        .response({
          id_token: createToken(req.pre.user),
          user: req.pre.user.username,
          email: req.pre.user.email,
          rol: req.pre.user.role,
        })
        .code(201);
    },
    validate: {
      payload: authenticateUserSchema,
    },
  },
};
