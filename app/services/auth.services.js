const db = require("../models");
const User = db.user;
const Details = db.details;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


const signup = async (data, res) => {
    // Our register logic starts here
    console.log('called')
    try {
        // Get user input
        const { name, email, password } = data;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
        console.log(oldUser)

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedUserPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            name: name,
            email: email.toLowerCase(), // sanitize
            password: encryptedUserPassword,
        });

        console.log(process.env.TOKEN_KEY)

        // Create token
        // const token = jwt.sign(
        //     { user_id: user._id, email },
        //     process.env.TOKEN_KEY,
        //     {
        //         expiresIn: "1h",
        //     }
        // );
        // // save user token
        // user.token = token;

        // return new user
        res.status(201).json({ msg: "Account Created Successfully, Now Log In" });
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
}

const signin = async (data, res) => {


    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = data;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );

            // save user token
            user.token = token;

            // user
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");

        // Our login logic ends here

    }
    catch (err) {
        console.log(err);
    }    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );

            // save user token
            user.token = token;

            // user
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");

        // Our login logic ends here

    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    signup,
    signin
}