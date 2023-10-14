const mongoose = require('mongoose');

const details = mongoose.model('details',
    new mongoose.Schema({
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
        profile: {
            name: { type: String, default: null },
            email: { type: String, default: null },
            dob: { type: String, default: null },
            gender: { type: String, default: null },
            profile_description: { type: String, default: null },
        },
        exp: { type: [], default: [] },
        skills: { type: [], default: [] },
        projects: { type: [], default: [] }

    })
)

module.exports = details;