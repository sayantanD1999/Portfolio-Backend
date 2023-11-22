const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String, default: null },
    token: { type: String },
    expiresIn: { type: String },
  })
);

module.exports = User;