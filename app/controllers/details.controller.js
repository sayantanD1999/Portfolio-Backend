const db = require("../models");
const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();
const details = db.details;
const users = db.user;

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

exports.skills = async (req, res) => {
    if (req.method == "PATCH") {
        try {
            const id = req.params.id;
            const { skills } = req.body;
            if (skills.length == 0) {
                res.status(400).send('Skills cannot be blank');
            }


            const user = await users.findOne({ id });
            console.log(user)
            if (!user) {
                return res.status(400).json({ msg: "Invalid User" });
            }
            else {
                await details.create(
                    {
                        skills: skills
                    }
                )
            }


            return res.status(200).json({ msg: "Skills Added Successfully." });


        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: "Something went wrong" });
        }
    }
    if (req.method == "GET") {
        try {
            const data = await details.findOne({ _id: req.params.id })
            console.log(data)
            return res.status(200).json({ msg: "Skills fetched successfully", data: data.skills });

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
    const data = await Details.findOne({ email })

    res.status(200).send({ data: data });
}