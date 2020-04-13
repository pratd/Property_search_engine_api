const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const officeSchema = new Schema({
	_id:Number,
	name: String,
	photos: [],
	description: String,
	user_id: Number,
	kind: String,
	location: String,
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