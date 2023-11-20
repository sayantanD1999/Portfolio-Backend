const { validationResult } = require("express-validator");
const { signup, signin } = require('../services/auth.services')


exports.signup = async (req, res) => {

    const { name, email, password } = req.body;

    const errors = validationResult(req);
    // console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    if (!(email && password)) {
        return res.status(400).json({
            message: "All input is required!",
        })
    }
    else {
        const signupService = await signup(req.body)
        console.log(signupService)
        return res.status(signupService.status).json(
            signupService.data)
    }

}

exports.signin = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const signinService = await signin(req.body)
    return res.status(signinService.status).json(
        signinService.data)


}

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};