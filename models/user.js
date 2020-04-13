const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: Number,
	avatar: Object,
    username: String,
    password: String,
    email: String,
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