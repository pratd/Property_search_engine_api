// const homeSchema = require("../models/homes");
const userSchema = require("../models/user");

module.exports = {
  method: "POST",
  path: "/home/add",
  config: {
    auth: {
      strategy: "jwtokenization",
      scope: ["user"],
    },
    handler: async (req, res) => {
      try {
        const user = await userSchema.find().exec();
        return res.response(user);
      } catch (error) {
        return res.response(error).code(500);
      }
    },
  },
};
