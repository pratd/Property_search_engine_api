const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema({
	_id:Number,
	name: String,
	photos: Array,
	description: String,
	kind: String,
	location: String,
	user_id: Number,
	bedrooms: String,
	bathrooms: String,
	kitchen: String,
	condition: String,
	price: Number,
	lift: Boolean,
	pets_allowed: Boolean,
	garden: Boolean,
	swimming_pool: Boolean,
	air_conditioning: Boolean,
	heating: Boolean,
	floor: String,
	orientation: String,
	energy_certificate: String,
	parking: String,
	bargain: Boolean
},
{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('homes', homeSchema)