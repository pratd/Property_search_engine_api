const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	avatar: Object,
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    // homes_ids: [
	// 	{ type: mongoose.Schema.Types.ObjectId, ref: 'homes' }
	// ],
    // offices_ids: [
	// 	{ type: mongoose.Schema.Types.ObjectId, ref: 'offices' }
	// ],
    role: String
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
	}
);

module.exports = mongoose.model('users', userSchema)