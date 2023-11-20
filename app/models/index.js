const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.details = require("./details.model")
db.projects = require("./projects.model")

module.exports = db;