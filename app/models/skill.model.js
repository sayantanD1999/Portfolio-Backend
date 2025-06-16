const db = require("../config/db");

const users = {
  async getAllSkills(user_id) {
    const [rows] = await db.query("SELECT * FROM Skills WHERE user_id=?", [
      user_id,
    ]);
    return rows;
  },

  async create(data) {
    const { user_id, skill_name, proficiency } = data;
    const [rows] = await db.query(
      "INSERT INTO SKills (user_id,skill_name, proficiency) VALUES (?,?,?)",
      [user_id, skill_name, proficiency]
    );
    return rows;
  },

  async update(data) {
    const { user_id, skill_name, proficiency, skill_id } = data;
    const [rows] = await db.query(
      "UPDATE Skills SET skill_name = ?, proficiency = ? WHERE skill_id = ? AND user_id = ?",
      [skill_name, proficiency, skill_id, user_id]
    );
    return rows;
  },

  async delete(user_id, skill_id) {
    const [rows] = await db.query(
      "DELETE FROM Skills WHERE user_id=? AND skill_id=?",
      [user_id, skill_id]
    );
    return rows;
  },
};

module.exports = users;
