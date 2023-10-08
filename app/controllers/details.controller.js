// const db = require("../models");
const express = require("express");
const fileUpload = require('express-fileupload');
const { details } = require("../models");
const app = express();

// const users = db.user;

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);


exports.skills = async (req, res) => {

    if (req.method == "POST") {
        try {
            console.log('req.user', req.user)
            const { skills } = req.body;
            if (skills.length == 0) {
                res.status(400).send('Skills cannot be blank');
            }
            await details.create(
                {
                    skills: skills,
                    user_id: req.user._id
                }
            )
            return res.status(200).json({ msg: "Skills Added Successfully." });


        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Something went wrong" });
        }
    }
    if (req.method == "PATCH") {
        try {
            const user_id = req.params.user_id;
            const { skills } = req.body;
            if (skills.length == 0) {
                res.status(400).send('Skills cannot be blank');
            }
            const details_db = await details.findOne({ user_id })
            if (details_db) {
                details_db.skills = skills;
                details_db.save();
                return res.status(200).json({ msg: "Skills Updated Successfully." });
            } else {
                return res.status(422).json({ msg: "Invalid User Id" });
            }


        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Something went wrong" });
        }
    }
    if (req.method == "GET") {
        try {
            const user_id = req.params.user_id
            const data = await details.findOne({ user_id })
            if (data) {
                return res.status(200).json({ msg: "Skills fetched successfully", data: data.skills });
            } else {
                return res.status(422).json({ msg: "Invalid User Id" });
            }


        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: "Something went wrong" });
        }
    }
}


exports.projects = async (req, res) => {
    if (req.method == "PATCH") {
        try {
            const id = req.params.id;
            const { projects } = req.body;
            if (projects.length == 0) {
                res.status(400).send('Projects cannot be blank');
            }


            const user = await users.findOne({ id });
            if (!user) {
                return res.status(400).json({ msg: "Invalid User" });
            }
            else {
                let arr = [];
                for (let i = 0; i < projects.length; i++) {
                    if (!projects.img) {
                        return res.status(400).json({ msg: "Image is required for all projects" });
                    }

                    // If does not have image mime type prevent from uploading
                    if (/^image/.test(projects.img.mimetype)) return res.sendStatus(400);

                    // Move the uploaded image to our upload folder
                    image.mv(__dirname + '/assets/project' + image.name);

                }

                await details.create(
                    {
                        projects: projects
                    }
                )
            }


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


exports.profileDetails = async (req, res) => {

    const email = req.params.email;
    const data = await details.findOne({ email })

    return res.status(200).send({ data: data });
}