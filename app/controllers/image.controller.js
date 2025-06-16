const { updateImage } = require("../services/image.services");

exports.images = async (req, res) => {
  if (req.file) {
    if (req.params.user_id) {
      const imgService = await updateImage(req);
      return res.status(imgService.status).json(imgService.data);
    }
  } else {
    return res.status(400).json({ msg: "Please provide an image" });
  }
};
