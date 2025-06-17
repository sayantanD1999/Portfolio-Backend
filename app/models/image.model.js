const db = require("../config/db");

const images = {
  async update(img, id) {
    const [rows] = await db.query(
      "UPDATE Users SET img = ? WHERE user_id = ?",
      [img, id]
    );
    return rows;
  },

  //   async delete(user_id, skill_id) {
  //     const [rows] = await db.query(
  //       "DELETE FROM Skills WHERE user_id=? AND skill_id=?",
  //       [user_id, skill_id]
  //     );
  //     return rows;
  //   },
};

module.exports = images;
