const pool = require("../config/database");

const createUser = async ({ username, email, password }) => {
  const result = await pool.query(
    `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, role
    `,
    [username, email, password],
  );

  return result.rows[0];
};

const findByEmail = async (email) => {
  const result = await pool.query(
    `
      SELECT *
      FROM users
      WHERE email = $1
    `,
    [email],
  );

  return result.rows[0] || null;
};

const findById = async (id) => {
  const result = await pool.query(
    `
      SELECT id, username, email, role
      FROM users
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] || null;
};

const getAllUsers = async () => {
  const result = await pool.query(
    `
      SELECT id, username, email, role
      FROM users
      ORDER BY id
    `,
  );

  return result.rows;
};

const updateUserRole = async (id, role) => {
  const result = await pool.query(
    `
      UPDATE users
      SET role = $1
      WHERE id = $2
      RETURNING id, username, email, role
    `,
    [role, id],
  );

  return result.rows[0] || null;
};

module.exports = {
  createUser,
  findByEmail,
  findById,
  getAllUsers,
  updateUserRole,
};
