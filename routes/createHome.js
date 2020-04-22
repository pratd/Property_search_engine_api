// const homeSchema = require("../models/homes");
const userSchema = require("../models/user");
require("dotenv").config();
const secretKey = process.env.SECRET;

module.exports = {
  method: "GET",
  path: "/home/add",
  handler: (req, res) => {
    return res.response("hello!");
  },
  config: {
    auth: {
      strategy: "jwt",
      scope: ["user"],
    },
  },
};
