const db = require("../models");
require('dotenv').config();

const dbMongoose = async () => {
    await db.mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Successfully connected to MongoDB.");
            // initial();
        })
        .catch(err => {
            console.error("Connection error", err);
            process.exit();
        });
}

module.exports = dbMongoose;