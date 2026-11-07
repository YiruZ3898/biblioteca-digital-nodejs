const pool = require("../config/database.js");

const getAllBooks = async () => {
  const result = await pool.query(
    "SELECT * FROM books ORDER BY id",
  );

  return result.rows;
};

const getBookById = async (id) => {
  const result = await pool.query(
    `
      SELECT *
      FROM books
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] || null;
};

const createBook = async ({ title, author, category, description }) => {
  const result = await pool.query(
    `
      INSERT INTO books (title, author, category, description)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [title, author, category, description],
  );

  return result.rows[0];
};

const updateBook = async (id, { title, author, category, description }) => {
  const result = await pool.query(
    `
      UPDATE books
      SET title = $1,
          author = $2,
          category = $3,
          description = $4
      WHERE id = $5
      RETURNING *
    `,
    [title, author, category, description, id],
  );

  return result.rows[0] || null;
};

const deleteBook = async (id) => {
  const result = await pool.query(
    `
      DELETE FROM books
      WHERE id = $1
    `,
    [id],
  );

  return result.rowCount;
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
