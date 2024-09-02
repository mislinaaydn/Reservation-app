const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      undefined: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: false,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: false,
    },
    isAdmin: {
      //admin olup olmadığının kontrolü sağlanır
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
