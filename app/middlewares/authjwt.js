const jwt = require("jsonwebtoken");
const { user } = require("../models");

const config = process.env;

const verifyToken = async (req, res, next) => {

  const accessToken = req.headers['authorization'].split(' ')[1];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken && !refreshToken) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY, (err, user) => {
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
      const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });
      res
        .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
        .header('Authorization', accessToken)
        .send(decoded.user);
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