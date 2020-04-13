const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyersRequestsSchema = new Schema({
	_id:Number,
	property_id:Array,
	seller_id:Number,
	buyer_name: String,
	buyer_email: String,
	buyer_message:String
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
	}
)

module.exports = mongoose.model('buyersRequests', buyersRequestsSchema)