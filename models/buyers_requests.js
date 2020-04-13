const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyersRequestsSchema = new Schema({
	_id:Number,
	// home_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Home' },
	// office_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Office' },
	property_id: Array,
	buyer_name: String,
	buyer_email: String,
	buyer_message:String
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
	}
)

module.exports = mongoose.model('buyersRequests', buyersRequestsSchema)