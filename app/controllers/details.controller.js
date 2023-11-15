// const db = require("../models");
const { getProfile, updateProfile, getSkills, updateSkills, updateProfileImage } = require('../services/details.services')
const express = require("express");
const { details } = require("../models");
const { validationResult } = require("express-validator");

var formidable = require('formidable');

exports.projects = async (req, res) => {
    if (req.method == "PATCH") {
        try {
            const id = req.params.user_id;
            console.log('body', req.body)


            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                // `file` is the name of the <input> field of type `file`
                console.log(files);
                console.log(fields);
            });

            // const { projects } = req.body;

            // const user = await users.findOne({ id });
            // if (!user) {
            //     return res.status(400).json({ msg: "Invalid User" });
            // }
            // else {
            //     let arr = [];
            //     for (let i = 0; i < projects.length; i++) {
            //         if (!projects.img) {
            //             return res.status(400).json({ msg: "Image is required for all projects" });
            //         }

            //         // If does not have image mime type prevent from uploading
            //         if (/^image/.test(projects.img.mimetype)) return res.sendStatus(400);

            //         // Move the uploaded image to our upload folder
            //         image.mv(__dirname + '/assets/project' + image.name);

            //     }

            //     await details.create(
            //         {
            //             projects: projects
            //         }
            //     )
            // }


            return res.status(200).json({ msg: "Projects Added Successfully." });


        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Something went wrong" });
        }
    }
    if (req.method == "GET") {
        try {
            const data = await details.findOne({ _id: req.params.id })
            console.log(data)
            return res.status(200).json({ msg: "Projects fetched successfully", data: data.projects });

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
