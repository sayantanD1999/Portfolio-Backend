const db = require("../models");
const User = db.user;
const Details = db.details;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


const signup = async (data) => {
    // Our register logic starts here
    try {
        // Get user input
        const { name, email, password } = data;

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return { status: 422, data: { msg: "User Already Exist.Please Login" } }
        }



        //Encrypt user password
        encryptedUserPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            name: name,
            email: email.toLowerCase(), // sanitize
            password: encryptedUserPassword,
            token: '',
        });
        await Details.create({
            user_id: user._id,
            profile: {
                email: email.toLowerCase(), // sanitize
            }
        });
        const new_user = await User.findOne({ email })

        // console.log(process.env.TOKEN_KEY)

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
        // console.log(new_user)

        // let obj = new_user;
        // obj.password = ""


        return {
            status: 200, data: {
                data: new_user,
                msg: "Account Created Successfully, Now Log In"
            }
        }
    } catch (err) {
        console.log(err);
        return { status: 422, data: { msg: "Something went wrong" } }
    }
    // Our register logic ends here
}

const signin = async (data) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = data;

        // Validate if user exist in our database
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return { status: 404, data: { msg: "No Such User Exists!" } }
        }

        if (await bcrypt.compare(password, user.password)) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "8h",
                }
            );

            const refreshToken = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: '1d' });

            res
                .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
                .header('Authorization', accessToken)
                .send(user);

            // save user token
            user.token = token;
            user.refreshToken = refreshToken;
            user.save();

            // user


            return { status: 200, data: user }
        }
        else {
            return { status: 422, data: { msg: "Invalid Credentials" } }
        }

        // Our login logic ends here

    }
    catch (err) {
        console.log(err);
    }
}

const signoutService = async (req) => {
    console.log(req.user, req.session)
    const user = await User.findOne({ _id: req.user._id })
    user.token = null;
    user.refreshToken = token;
    req.session = null;
    req.user = null;
    return {
        status: 200, data: {
            data: null,
            message: "Logged Out Successfully"
        }
    }
}


module.exports = {
    signup,
    signin,
    signoutService
}