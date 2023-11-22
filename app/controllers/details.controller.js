// const db = require("../models");
const { getProfile, updateProfile, getSkills, updateSkills, getEducation, updateEducation, updateProfileImage, deleteProject, getProjects, updateProject, updateExperience, getExperience, addProject } = require('../services/details.services')
const { details, projects } = require("../models");
const { validationResult } = require("express-validator");

exports.projects = async (req, res) => {
    const errors = validationResult(req)
    if (req.method == "POST") {
        try {
            console.log('body', req.body, req.file, errors)
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }

            if (!req.body.name) {
                return res.status(422).json({ msg: "Project name is required" });
            }

            if (req.file) {
                if (req.params.user_id) {
                    const projectService = await addProject(req)
                    return res.status(projectService.status).json(
                        projectService.data)
                } else {
                    return res.status(400).json({ msg: "Invalid Request" });
                }
            } else {
                return res.status(422).json({ msg: "Please provide an image" });
            }


        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Something went wrong" });
        }
    }
    if (req.method == "PATCH") {
        try {
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }
            // console.log('body', req.body, req.file)

            if (!req.body.name) {
                return res.status(422).json({ msg: "Project name is required" });
            }


            if (req.file) {
                if (req.params._id) {
                    const projectService = await updateProject(req)
                    return res.status(projectService.status).json(
                        projectService.data)
                } else {
                    return res.status(400).json({ msg: "Invalid Request" });
                }
            } else {
                return res.status(422).json({ msg: "Please provide an image" });
            }


        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Something went wrong" });
        }
    }
    if (req.method == "GET") {
        try {
            if (req.params.user_id) {
                const projectService = await getProjects(req)
                return res.status(projectService.status).json(
                    projectService.data)
            } else {
                return res.status(400).json({ msg: "Invalid Request" });
            }

        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: "Something went wrong" });
        }
    }
    if (req.method == "DELETE") {
        try {
            if (req.params._id) {
                const projectService = await deleteProject(req)
                return res.status(projectService.status).json(
                    projectService.data)
            } else {
                return res.status(400).json({ msg: "Invalid Request" });
            }

        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: "Something went wrong" });
        }
    }
}

exports.profileImage = async (req, res) => {

    if (req.file) {
        if (req.params.user_id) {
            const profileService = await updateProfileImage(req)
            return res.status(profileService.status).json(
                profileService.data)
        }
    } else {
        return res.status(400).json({ msg: "Please provide an image" });
    }

}

exports.profileDetails = async (req, res) => {
    const errors = validationResult(req)
    if (req.params.user_id) {
        if (req.method == "GET") {

            const user_id = req.params.user_id;
            const profileService = await getProfile(user_id)
            console.log(profileService.data)
            return res.status(profileService.status).json(
                profileService.data)
        }
        if (req.method == "PATCH") {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user_id = req.params.user_id;
            const { details } = req.body;
            const profileService = await updateProfile(details, user_id)
            return res.status(profileService.status).json(
                profileService.data)
        }
    }
}

exports.skills = async (req, res) => {
    const errors = validationResult(req);

    if (req.method == "PATCH") {
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user_id = req.params.user_id;
            const { skills } = req.body;
            const skillService = await updateSkills(skills, user_id)
            return res.status(skillService.status).json(
                skillService.data)

        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Something went wrong" });
        }
    }
    if (req.method == "GET") {
        try {
            console.log(req.user._id.toString())
            const user_id = req.params.user_id
            const skillService = await getSkills(user_id)
            return res.status(skillService.status).json(
                skillService.data)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: "Something went wrong" });
        }
    }
}

exports.education = async (req, res) => {
    const errors = validationResult(req);

    if (req.method == "PATCH") {
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user_id = req.params.user_id;
            const { education } = req.body;
            const educationService = await updateEducation(education, user_id)
            return res.status(educationService.status).json(
                educationService.data)

        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Something went wrong" });
        }
    }
    if (req.method == "GET") {
        try {
            console.log(req.user._id.toString())
            const user_id = req.params.user_id
            const educationService = await getEducation(user_id)
            return res.status(educationService.status).json(
                educationService.data)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: "Something went wrong" });
        }
    }
}


exports.experience = async (req, res) => {
    const errors = validationResult(req);

    if (req.method == "PATCH") {
        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user_id = req.params.user_id;
            const { experience } = req.body;
            const experienceService = await updateExperience(experience, user_id)
            return res.status(experienceService.status).json(
                experienceService.data)

        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Something went wrong" });
        }
    }
    if (req.method == "GET") {
        try {
            console.log(req.user._id.toString())
            const user_id = req.params.user_id
            const experienceService = await getExperience(user_id)
            return res.status(experienceService.status).json(
                experienceService.data)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: "Something went wrong" });
        }
    }
}
