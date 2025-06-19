const db = require("../config/db");

const tokens = {
  async create(data) {
    const { user_id, token, refresh_token } = data;
    const [rows] = await db.query(
      "INSERT INTO AuthTokens (user_id,token, refresh_token) VALUES (?,?,?)",
      [user_id, token, refresh_token]
    );
    return rows;
  },

  async update(data) {
    const { user_id, token, refresh_token } = data;
    const [rows] = await db.query(
      "UPDATE AuthTokens SET token=?, refresh_token=? WHERE user_id=?",
      [token, refresh_token, user_id]
    );
    return rows;
  },

  async findOne(data) {
    const { user_id, token } = data;
    const [rows] = await db.query(
      "SELECT * FROM AuthTokens WHERE user_id=? AND token=? ",
      [user_id, token]
    );
    return rows;
  },

  async delete(data) {
    const { user_id } = data;
    const [rows] = await db.query("DELETE FROM AuthTokens WHERE user_id=?", [
      user_id,
    ]);
    return rows;
  },
};

module.exports = tokens;
