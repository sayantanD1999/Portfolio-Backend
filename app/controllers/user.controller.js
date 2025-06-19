const { validationResult } = require("express-validator");
const {
  updateUser,
} = require("../services/user.services");
const { getParticularUser } = require("../models/user.model");
exports.user = async (req, res) => {
  const errors = validationResult(req);
  if (req.method == "PATCH") {
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userService = await updateUser(req.body);
      return res.status(userService.status).json(userService.data);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Something went wrong" });
    }
  }
  if (req.method == "GET") {
    try {
      console.log(req.user);
      const user_id = req.params.user_id;
      const userData = await getParticularUser(user_id);
      return res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Something went wrong" });
    }
  }
};
