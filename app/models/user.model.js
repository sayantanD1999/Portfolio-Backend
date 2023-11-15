const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true },
    gender: { type: String, unique: false },
    dob: { type: String, unique: false },
    nationality: { type: String, unique: false },
    password: { type: String, default: null },
    token: { type: String },
    image: { type: String }
  })
);

module.exports = User;