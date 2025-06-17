const User = require("../models/user.model");
const AuthToken = require("../models/token.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const signup = async (data) => {
  // Our register logic starts here
  try {
    // Get user input
    const { name, email, password } = data;
    console.log("here");
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.getParticularUser("", email);
    console.log("here2", oldUser);
    if (oldUser.length > 0) {
      return { status: 422, data: { msg: "User Already Exist.Please Login" } };
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name: name,
      email: email.toLowerCase(), // sanitize
      password: encryptedUserPassword,
      token: "",
    });
    // await Details.create({
    //   user_id: user._id,
    //   profile: {
    //     email: email.toLowerCase(), // sanitize
    //   },
    // });
    const new_user = await User.getParticularUser("", email);

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
      status: 200,
      data: {
        data: new_user,
        msg: "Account Created Successfully, Now Log In",
      },
    };
  } catch (err) {
    console.log(err);
    return { status: 422, data: { msg: "Something went wrong" } };
  }
  // Our register logic ends here
};

const signin = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    console.log(email, password);

    // Validate if user exist in our database
    const user = await User.getParticularUser("", email);
    console.log(user.password);
    if (!user) {
      return { status: 404, data: { msg: "No Such User Exists!" } };
    }

    if (await bcrypt.compare(password, user.password)) {
      // Create token
      console.log(user.user_id);
      const accessToken = jwt.sign(
        { user_id: user.user_id, email },
        process.env.JWT_AT_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );

      const refreshToken = jwt.sign(
        { user_id: email },
        process.env.JWT_RT_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
      );

      // save user token
      //   user.token = accessToken;
      //   user.refreshToken = refreshToken;
      //   user.save();

      await AuthToken.create({
        user_id: user.user_id,
        token: accessToken,
        refresh_token: refreshToken,
      });

      let obj = {
        _id: user.user_id,
        accessToken: accessToken,
        ATExpiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        refreshToken: refreshToken,
        RTExpiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        name: user.name,
        email: user.email,
      };

      // user
      return { status: 200, data: obj };
    } else {
      return { status: 422, data: { msg: "Invalid Credentials" } };
    }

    // Our login logic ends here
  } catch (err) {
    console.log(err);
  }
};

const signoutService = async (req) => {
  console.log(req.user, req.session);
  const { email } = req.user;
  const user = await User.getParticularUser("", email);
  user.token = null;
  user.refreshToken = null;
  req.session = null;
  req.user = null;

  await AuthToken.delete({ user_id: user[0].user_id });

  return {
    status: 200,
    data: {
      data: null,
      message: "Logged Out Successfully",
    },
  };
};

module.exports = {
  signup,
  signin,
  signoutService,
};
