const mongoose = require('mongoose');

const details = mongoose.model('details',
    new mongoose.Schema({
        email: { type: String, default: null, required: true },
        profile: { type: String, default: null },
        exp: { type: [], default: [] },
        skills: { type: [], default: [] },
        projects: { type: [], default: [] }

    })
)

module.exports = details;