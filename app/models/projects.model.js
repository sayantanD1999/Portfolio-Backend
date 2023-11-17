const mongoose = require('mongoose');

const projects = mongoose.model('projects',
    new mongoose.Schema({
        user_id: { type: String, required: true, unique: false },
        name: { type: String, required: true },
        description: { type: String },
        img: { type: String },
        link: { type: String },
    }, { timestamps: true })
)

module.exports = projects;