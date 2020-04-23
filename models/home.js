const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema(
  {
    name: String,
    photos: Array,
    description: String,
    kind: String,
    street: String,
    city: String,
    postalcode: String,
    country: String,
    // location: Array,
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
    bargain: { type: Boolean, default: 0 },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    user_username: String,
    user_email: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("homes", homeSchema);
