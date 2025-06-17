const Images = require("../models/image.model");
const User = require("../models/user.model");

const updateImage = async (req) => {
  try {
    const { user_id } = req.body;
    let profile_image =
      "profile_img_uploads/" +
      user_id +
      "profile_pic." +
      req.file.mimetype.split("/")[1];

    console.log(profile_image)

    await Images.update(profile_image, user_id);
    let data = await User.getParticularUser({ user_id: user_id });
    return {
      status: 200,
      data: {
        data: data,
        message: "Profile Image Updated Successfully",
      },
    };
  } catch (error) {
    return {
      status: 422,
      data: { msg: error || "Error updating profile image" },
    };
  }
};

module.exports = {
  updateImage,
};
