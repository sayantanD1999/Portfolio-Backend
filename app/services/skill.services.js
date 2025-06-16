const Skill = require("../models/skill.model");

const addSkill = async (req, res) => {
  try {
    const { user_id, skills } = data;

    const newSkill = [];

    for (let i = 0; i < skills.length; i++) {
      // Add skill to the database
      let addedSkill = await Skill.create({
        user_id: user_id,
        skill_name: skills[i].skill_name,
        proficiency: skills[i].proficiency,
      });
      newSkill.push(addedSkill);
    }

    return {
      status: 201,
      data: { msg: "Skill added successfully", skill: newSkill },
    };
  } catch (err) {
    console.error(err);
    return { status: 422, data: { msg: err } };
  }
};

const updateSkill = async (data) => {
  try {
    const { user_id, skill_id, skill_name, proficiency } = data;

    // Update skill in the database
    const updatedSkill = await Skill.update({
      user_id: user_id,
      skill_id: skill_id,
      skill_name: skill_name,
      proficiency: proficiency,
    });

    return {
      status: 200,
      data: { msg: "Skill updated successfully", skill: updatedSkill },
    };
  } catch (err) {
    console.error(err);
    return { status: 422, data: { msg: err } };
  }
};

const getAllSkills = async (data) => {
  try {
    const { user_id } = data;

    // Get all skills for the user
    const skills = await Skill.getAllSkills(user_id);

    return {
      status: 200,
      data: { skills: skills },
    };
  } catch (err) {
    console.error(err);
    return { status: 422, data: { msg: "Something went wrong" } };
  }
};

const deleteSkill = async (data) => {
  try {
    const { user_id, skill_id } = data;

    // Delete skill from the database
    await Skill.delete(user_id, skill_id);

    return {
      status: 200,
      data: { msg: "Skill deleted successfully" },
    };
  } catch (err) {
    console.error(err);
    return { status: 422, data: { msg: err } };
  }
};

module.exports = {
  addSkill,
  updateSkill,
  getAllSkills,
  deleteSkill,
};
