const User = require("../models/user.model");
var bcrypt = require("bcryptjs");

const updateUser = async (data) => {
  try {
    const { user_id, name, password } = data;
    
    let newPassword = await bcrypt.hash(password, 10);
    // console.log('----', user_id, name, newPassword);
    // Update user in the database
    const updateUser = await User.update({
      user_id: user_id,
      name: name,
      password: newPassword,
    });

    // console.log('updated', updateUser)

    const updatedUser = await User.getParticularUser(user_id);

    return {
      status: 200,
      data: { msg: "User updated successfully", user: updatedUser },
    };
  } catch (err) {
    console.error(err);
    return { status: 422, data: { msg: err } };
  }
};

module.exports = {
  updateUser,
};
