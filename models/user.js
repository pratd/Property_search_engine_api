const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	avatar:Object,
    username: String,
    password: String,
    email:String,
    property_id:Array,
    role:String
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
	}
)

module.exports = mongoose.model('users', userSchema)