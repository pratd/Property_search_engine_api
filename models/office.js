const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const officeSchema = new Schema(
  {
    // _id:Number,
    name: String,
    photos: Array,
    description: String,
    kind: String,
    location: Array,
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
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("offices", officeSchema);
