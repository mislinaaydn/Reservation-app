const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  decs: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: false,
  },
  photos: {
    type: [String],
  },
  address: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  featured: {
    type: String,
    required: false,
  },
  cheapestPrice: {
    type: Number,
    required: false,
  },
});
module.exports = mongoose.model("Hotel", hotelSchema);
