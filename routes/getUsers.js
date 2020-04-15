const userSchema = require("../models/user");

module.exports ={
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
};