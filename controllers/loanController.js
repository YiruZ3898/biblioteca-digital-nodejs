const Loan = require("../models/Loan.js");

const requestLoan = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const userId = req.user.id;

    const result = await Loan.requestLoan(userId, bookId);

    if (result.status === "ACTIVE_REQUEST") {
      return res.status(409).send("Ya tienes una solicitud activa para este libro.");
    }

    if (result.status === "BOOK_NOT_FOUND") {
      return res.status(404).send("Libro no encontrado.");
    }

    if (result.status === "BOOK_UNAVAILABLE") {
      return res.status(409).send("El libro no está disponible.");
    }

    res.redirect("/books");
  } catch (error) {
    next(error);
  }
};

const getMyLoans = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const loans = await Loan.getUserLoans(userId);

    res.render("loans/index", {
      pageTitle: "Mis préstamos",
      loans,
    });
  } catch (error) {
    next(error);
  }
};

const getAllLoans = async (req, res, next) => {
  try {
    const loans = await Loan.getAllLoans();

    res.render("loans/admin", {
      pageTitle: "Gestión de préstamos",
      loans,
    });
  } catch (error) {
    next(error);
  }
};

const approveLoan = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Loan.approveLoan(id);

    if (result.status === "LOAN_NOT_FOUND") {
      return res.status(404).send("Préstamo no encontrado.");
    }

    if (result.status === "BOOK_NOT_FOUND") {
      return res.status(404).send("Libro no encontrado.");
    }

    if (result.status === "BOOK_UNAVAILABLE") {
      return res.status(409).send("El libro ya está prestado.");
    }

    res.redirect("/loans/admin");
  } catch (error) {
    next(error);
  }
};

const returnLoan = async (req, res, next) => {
  try {
    const { id } = req.params;

    const loan = await Loan.returnLoan(id);

    if (!loan) {
      return res.status(404).send("Préstamo no encontrado.");
    }

    res.redirect("/loans/admin");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requestLoan,
  getMyLoans,
  getAllLoans,
  approveLoan,
  returnLoan,
};
