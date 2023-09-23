const { signup, signin } = require('../services/auth.services')


exports.signup = async (req, res) => {
    console.log('cont');
    let result = await signup(req.body, res);
    return result;
}

exports.signin = async (req, res) => {
    let result = await signin(req.body, res);
    return result;


}

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};