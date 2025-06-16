const Images = require("../models/image.model");

const updateImage = async (req) => {
  const { user_id } = req.body;
  let profile_image =
    "profile_img_uploads/" +
    user_id +
    "profile_pic." +
    req.file.mimetype.split("/")[1];
  let user = await Images.update(profile_image, user_id);
  return {
    status: 200,
    data: {
      data: user,
      message: "Profile Image Updated Successfully",
    },
  };
};

module.exports = {
  updateImage,
};
