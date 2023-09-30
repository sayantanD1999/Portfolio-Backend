const { signup, signin } = require('../services/auth.services')


exports.signup = async (req, res) => {

    const signupService = await signup(req.body)
    return res.status(signupService.status).send(signupService.msg);
}

exports.signin = async (req, res) => {

    const signinService = await signin(req.body)
    return res.status(signinService.status).send(signinService.msg);
}

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};