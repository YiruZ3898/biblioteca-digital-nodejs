const pool = require("../config/database");

const requestLoan = async (userId, bookId) => {
  const existingLoan = await pool.query(
    `
      SELECT *
      FROM loans
      WHERE user_id = $1
        AND book_id = $2
        AND status IN ('PENDING', 'APPROVED')
    `,
    [userId, bookId],
  );

  if (existingLoan.rows.length > 0) {
    return { status: "ACTIVE_REQUEST" };
  }

  const bookResult = await pool.query(
    `
      SELECT *
      FROM books
      WHERE id = $1
    `,
    [bookId],
  );

  const book = bookResult.rows[0];

  if (!book) {
    return { status: "BOOK_NOT_FOUND" };
  }

  if (!book.available) {
    return { status: "BOOK_UNAVAILABLE" };
  }

  const result = await pool.query(
    `
      INSERT INTO loans (user_id, book_id)
      VALUES ($1, $2)
      RETURNING *
    `,
    [userId, bookId],
  );

  return { status: "CREATED", loan: result.rows[0] };
};

const getUserLoans = async (userId) => {
  const result = await pool.query(
    `
      SELECT
        loans.id,
        books.title,
        books.author,
        loans.status,
        loans.loan_date
      FROM loans
      INNER JOIN books ON loans.book_id = books.id
      WHERE loans.user_id = $1
      ORDER BY loans.id DESC
    `,
    [userId],
  );

  return result.rows;
};

const getAllLoans = async () => {
  const result = await pool.query(
    `
      SELECT
        loans.id,
        users.username,
        books.title,
        loans.status,
        loans.loan_date
      FROM loans
      INNER JOIN users ON loans.user_id = users.id
      INNER JOIN books ON loans.book_id = books.id
      ORDER BY loans.id DESC
    `,
  );

  return result.rows;
};

const approveLoan = async (id) => {
  const loanResult = await pool.query(
    `
      SELECT *
      FROM loans
      WHERE id = $1
    `,
    [id],
  );

  const loan = loanResult.rows[0];

  if (!loan) {
    return { status: "LOAN_NOT_FOUND" };
  }

  const bookResult = await pool.query(
    `
      SELECT *
      FROM books
      WHERE id = $1
    `,
    [loan.book_id],
  );

  const book = bookResult.rows[0];

  if (!book) {
    return { status: "BOOK_NOT_FOUND" };
  }

  if (!book.available) {
    return { status: "BOOK_UNAVAILABLE" };
  }

  await pool.query(
    `
      UPDATE loans
      SET status = 'APPROVED'
      WHERE id = $1
    `,
    [id],
  );

  await pool.query(
    `
      UPDATE books
      SET available = FALSE
      WHERE id = $1
    `,
    [loan.book_id],
  );

  await pool.query(
    `
      UPDATE loans
      SET status = 'REJECTED'
      WHERE book_id = $1
        AND id <> $2
        AND status = 'PENDING'
    `,
    [loan.book_id, id],
  );

  return { status: "APPROVED" };
};

const returnLoan = async (id) => {
  const loanResult = await pool.query(
    `
      SELECT *
      FROM loans
      WHERE id = $1
    `,
    [id],
  );

  const loan = loanResult.rows[0];

  if (!loan) {
    return null;
  }

  await pool.query(
    `
      UPDATE loans
      SET status = 'RETURNED'
      WHERE id = $1
    `,
    [id],
  );

  await pool.query(
    `
      UPDATE books
      SET available = TRUE
      WHERE id = $1
    `,
    [loan.book_id],
  );

  return loan;
};

module.exports = {
  requestLoan,
  getUserLoans,
  getAllLoans,
  approveLoan,
  returnLoan,
};
