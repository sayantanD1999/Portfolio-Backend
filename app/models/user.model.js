const db = require("../config/db");

const users = {
  async getAllUsers() {
    const [rows] = await db.query("SELECT * FROM Users");
    return rows;
  },

  async getParticularUser(user_id, email = "") {
    console.log(user_id, email);
    const [rows] = await db.query(
      "SELECT * FROM Users WHERE user_id=? OR email=?",
      [user_id, email]
    );

    console.log("particular user ================>", rows);
    return rows[0];
  },

  async create(data) {
    const { user_id, email, password, name, created_at, updated_at } = data;
    const [rows] = await db.query(
      "INSERT INTO Users (user_id,email,password,name,created_at, updated_at) VALUES (?,?,?,?,?, ?)",
      [user_id, email, password, name, created_at, updated_at]
    );
    return rows;
  },

  async update(data) {
    const { password, name, user_id } = data;
    const [rows] = await db.query(
      "UPDATE Users SET password = ?, name = ? WHERE user_id = ?",
      [password, name, user_id]
    );
    return rows;
  },

  async delete(user_id) {
    const [rows] = await db.query(
      "UPDATE Users SET is_deleted = TRUE, WHERE user_id = ?",
      [user_id]
    );
    return rows;
  },
};

module.exports = users;
