const { skills } = require("../controllers/details.controller");
const db = require("../models");
const User = db.user;
const Details = db.details;
const Projects = db.projects;
const fs = require('fs')

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

//Project

const addProject = async (req) => {
    const user = await User.findOne({
        _id: req.params.user_id
    });

    const [first, ...rest] = req.file.path.split('/');

    await Projects.create(
        {
            user_id: user._id.toString(),
            name: req.body.name,
            description: req.body.description,
            // img: "project_img_uploads/" + req.user._id + '/' + req.body.name + "project_pic." + req.file.mimetype.split('/')[1],
            img: rest.join('/'),
            link: req.body.link,
        }
    )

    const allProjects = await Projects.find({ user_id: req.params.user_id })

    return {
        status: 200, data: {
            data: allProjects,
            message: "Project Added Successfully"
        }
    }
}

const updateProject = async (req) => {

    const getProject = await Projects.findOne({ _id: req.params._id })
    // console.log(getProject, req.file)


    if (fs.existsSync(`public/${getProject.img}`)) {
        console.log('file exists');
        fs.unlink(`public/${getProject.img}`, (err) => {
            if (err) throw err;
            console.log('Last Image was deleted');
        });

    } else {
        console.log('file not found!');
    }
    const [first, ...rest] = req.file.path.split('/');
    await Projects.updateOne(
        { _id: req.params._id },
        {
            $set:
            {
                // user_id: user._id.toString(),
                name: req.body.name,
                description: req.body.description,
                // img: "project_img_uploads/" + req.user._id + '/' + req.body.name + "project_pic." + req.file.mimetype.split('/')[1],
                img: rest.join('/'),
                link: req.body.link,
            }
        }
    )
    const particularProject = await Projects.findOne({ _id: req.params._id });

    // console.log(particularProject)

    return {
        status: 200, data: {
            data: particularProject,
            message: "Project Updated Successfully"
        }
    }
}


const getProjects = async (req) => {
    const allProjects = await Projects.find({ user_id: req.params.user_id })
    if (allProjects.length > 0) {
        return {
            status: 200, data: {
                data: allProjects,
                message: "Project Fetched Successfully"
            }
        }
    }
    else {
        return {
            status: 200, data: {
                data: allProjects,
                message: "No Projects Available"
            }
        }
    }

}

const deleteProject = async (req) => {

    const getProject = await Projects.findOne({ _id: req.params._id })
    // console.log(getProject, req.file)


    if (fs.existsSync(`public/${getProject.img}`)) {
        console.log('file exists');
        fs.unlink(`public/${getProject.img}`, (err) => {
            if (err) throw err;
            console.log('Last Image was deleted');
        });

    } else {
        console.log('file not found!');
    }

    const deleteProject = await Projects.deleteOne({ _id: req.params._id })
    const allProjects = await Projects.find({ user_id: req.user._id })

    if (deleteProject.deletedCount > 0) {
        return {
            status: 200, data: {
                data: allProjects,
                message: "Project Deleted Successfully"
            }
        }
    } else {
        return {
            status: 200, data: {
                data: null,
                message: "No Projects Available"
            }
        }
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


//Experience

const getExperience = async (user_id) => {
    const data = await Details.findOne({ user_id })
    return {
        status: 200, data: {
            data: data.exp,
            message: "Experience Fetched Successfully"
        }
    }
}

const updateExperience = async (details, user_id) => {
    // const _id = user_id
    console.log(details)
    const data = await Details.findOne({ user_id })
    if (data) {
        data.exp = details
        data.user_id = user_id
        data.save();
        return {
            status: 200, data: {
                data: data.exp,
                message: "Experience Updated Successfully"
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
    getExperience, updateExperience,
    addProject, updateProject, getProjects,
    deleteProject,
    updateProfileImage,
}