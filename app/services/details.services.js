const db = require("../models");
const User = db.user;
const Details = db.details;


const getProfile = async (user_id) => {
    const data = await Details.findOne({ user_id })
    return { status: 200, data: data }
}

const updateProfile = async (details, user_id) => {
    // const _id = user_id
    const data = await Details.findOne({ user_id })
    console.log(details, data)
    if (data) {
        // console.log(details)s
        data.profile = details
        data.save();
        return {
            status: 200, data: {
                data: data.profile,
                message: "User Updated Successfully"
            }
        }
    }
    else {
        return { status: 422, data: { message: "Invalid Request" } }
    }
}

const createProfile = async (details, user_id, req) => {
    const _id = user_id
    const data = await User.findOne({ _id })
    console.log(details, data)
    if (data) {
        await Details.create(
            {
                profile: details,
                user_id: req.user._id
            }
        )
        const profile = Details.findOne({ user_id })
        return {
            status: 200, data: {
                data: profile.profile,
                message: "Profile Created Successfully"
            }
        }
    }
    else {
        return { status: 422, data: { message: "Invalid Request" } }
    }
}



module.exports = {
    getProfile, updateProfile, createProfile
}