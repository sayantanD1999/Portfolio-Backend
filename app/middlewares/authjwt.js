const jwt = require("jsonwebtoken");
const { user } = require("../models");
const db = require("../models");
const User = db.user;

const config = process.env;

const verifyToken = async (req, res, next) => {
  const accessToken = req.headers['authorization'].split(' ')[1];
  const refreshToken = req.headers['refreshToken'];

  if (!accessToken && !refreshToken) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(accessToken, config.TOKEN_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid Token.' });
      }
    });
    req.user = await user.findOne({ _id: decoded.user_id });
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }
    try {
      req.user = await user.findOne({ _id: decoded.user_id });
      const decoded = jwt.verify(refreshToken, config.TOKEN_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid Token.' });
        }
      });
      const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

      const user = await User.findOne({ email });
      // save user token
      user.token = accessToken;
      user.refreshToken = refreshToken;
      user.save();


    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }
  }

  //Without Refresh Token

  // // console.log(req.headers)

  // const token =
  //   (req.body.token || req.query.token || req.headers["authorization"]).split(' ')[1];

  // // console.log(token)


  // if (!token) {
  //   return res.status(403).send("A token is required for authentication");
  // }
  // try {
  //   const decoded = jwt.verify(token, config.TOKEN_KEY, (err, user) => {
  //     if (err) {
  //       return res.status(403).json({ error: 'Invalid Token.' });
  //     }
  //   });
  //   console.log(decoded)
  //   req.user = await user.findOne({ _id: decoded.user_id });
  // } catch (err) {
  //   return res.status(401).send("Invalid Token");
  // }
  // return next();
};

module.exports = verifyToken;