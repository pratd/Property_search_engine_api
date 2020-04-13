const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyersRequestsSchema = new Schema({
	property_id: { type: mongoose.Schema.Types.ObjectId },
	buyer_name: String,
	buyer_email: String,
	buyer_message:String
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
	}
)

module.exports = mongoose.model('buyersRequests', buyersRequestsSchema)