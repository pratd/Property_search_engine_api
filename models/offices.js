const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const officeSchema = new Schema({
	name: String,
	photos: [],
	description: String,
	location: String,
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	kind: String,
	price: Number,
	lift: Boolean,
	pets_allowed: Boolean,
	air_conditioning: Boolean,
	terrace: Boolean,
	bargain: Boolean
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
	}
)

module.exports = mongoose.model('offices', officeSchema)