const { skills } = require("../controllers/details.controller");
const db = require("../models");
const User = db.user;
const Details = db.details;

//Profile

const getProfile = async (user_id) => {
    const data = await Details.findOne({ user_id })
    if (data) {
        return { status: 200, data: { data: data.profile, message: "Profile fetched successfully", } }
    }
    else {
        return {
            status: 400, data: {
                message: "Invalid Request",
            }
        }
    }

}

const updateProfile = async (details, user_id) => {
    const data = await Details.findOne({ user_id })
    if (data) {
        data.profile = details
        data.user_id = user_id
        data.save();
        return {
            status: 200, data: {
                data: data.profile,
                message: "Profile Updated Successfully"
            }
        }
    }
    else {
        return { status: 422, data: { message: "Invalid Request" } }
    }
}

//Profile Image

const updateProfileImage = async (req) => {
    const user = await Details.findOne({ user_id: req.params.user_id });
    // console.log(user)
    if (user) {
        user.profile.image = "profile_img_uploads/" + req.user._id + "profile_pic." + req.file.mimetype.split('/')[1];
        user.save();
        return {
            status: 200, data: {
                data: user.profile,
                message: "Profile Image Updated Successfully"
            }
        }
    }
    else {
        return { status: 422, data: { message: "Invalid Request" } }
    }
}

//Skills

const getSkills = async (user_id) => {
    const data = await Details.findOne({ user_id })
    return {
        status: 200, data: {
            data: data.skills,
            message: "Skills Fetched Successfully"
        }
    }
}

const updateSkills = async (details, user_id) => {
    // const _id = user_id
    const data = await Details.findOne({ user_id })
    console.log(details, data)
    if (data) {
        // console.log(details)
        data.skills = details
        data.user_id = user_id
        data.save();
        return {
            status: 200, data: {
                data: data.skills,
                message: "Skills Updated Successfully"
            }
        }
    }
    else {
        return { status: 422, data: { message: "Invalid Request" } }
    }
}







module.exports = {
    getProfile, updateProfile,
    getSkills, updateSkills,
    updateProfileImage,
}