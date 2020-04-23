const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const officeSchema = new Schema(
  {
    name: String,
    photos: Array,
    description: String,
    kind: String,
    // location: Array,
    street: String,
    city: String,
    postalcode: String,
    country: String,
    price: Number,
    lift: Boolean,
    pets_allowed: Boolean,
    air_conditioning: Boolean,
    heating: Boolean,
    floor: String,
    terrace: Boolean,
    energy_certificate: String,
    parking: String,
    bargain: Boolean,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    user_username: String,
    user_email: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("offices", officeSchema);
