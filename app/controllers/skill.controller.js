const { validationResult } = require("express-validator");
const {
  updateSkill,
  addSkill,
  deleteSkill,
  getAllSkills,
} = require("../services/skill.services");
exports.skills = async (req, res) => {
  const errors = validationResult(req);

  if (req.method == "POST") {
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const skillService = await addSkill(req.body);
      return res.status(skillService.status).json(skillService.data);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Something went wrong" });
    }
  }
  if (req.method == "PATCH") {
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const skillService = await updateSkill(req.body);
      return res.status(skillService.status).json(skillService.data);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Something went wrong" });
    }
  }
  if (req.method == "GET") {
    try {
      console.log(req.user);
      const user_id = req.params.user_id;
      const skillService = await getAllSkills(req.params);
      return res.status(skillService.status).json(skillService.data);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Something went wrong" });
    }
  }
  if (req.method == "DELETE") {
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const skillService = await deleteSkill(req.body);
      return res.status(skillService.status).json(skillService.data);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Something went wrong" });
    }
  }
};
