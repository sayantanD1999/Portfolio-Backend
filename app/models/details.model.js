const mongoose = require('mongoose');

const details = mongoose.model('details',
    new mongoose.Schema({
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
        profile: {
            name: { type: String },
            email: { type: String },
            dob: { type: String },
            gender: { type: String },
            image: {type: String},
            phone: {type: String},
            profile_description: { type: String },
        },
        exp: { type: Array },
        skills: { type: Array },
        projects: { type: Array }

    }, {timestamps: true})
)

module.exports = details;