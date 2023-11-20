const jwt = require("jsonwebtoken");
const { user } = require("../models");

const config = process.env;

const verifyToken = async (req, res, next) => {

  // console.log(req.headers)

  const token =
    (req.body.token || req.query.token || req.headers["authorization"]).split(' ')[1];

    // console.log(token)


  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = await user.findOne({_id: decoded.user_id});
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;