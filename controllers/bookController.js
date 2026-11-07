const Book = require("../models/Book.js");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.getAllBooks();

    res.render("books/index", {
      pageTitle: "Catálogo de libros",
      books,
    });
  } catch (error) {
    next(error);
  }
};

const showCreateForm = (req, res) => {
  res.render("books/new", { pageTitle: "Agregar libro" });
};

const createBook = async (req, res, next) => {
  try {
    const { title, author, category, description } = req.body;
    await Book.createBook({ title, author, category, description });

    res.redirect("/books");
  } catch (error) {
    next(error);
  }
};

const showBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.getBookById(id);

    if (!book) {
      const error = new Error("Libro no encontrado");
      error.statusCode = 404;
      return next(error);
    }

    res.render("books/show", {
      pageTitle: "Detalle del libro",
      book,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Book.deleteBook(id);

    res.redirect("/books");
  } catch (error) {
    next(error);
  }
};

const showEditForm = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.getBookById(id);

    if (!book) {
      const error = new Error("Libro no encontrado");
      error.statusCode = 404;
      return next(error);
    }

    res.render("books/edit", {
      pageTitle: "Editar libro",
      book,
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title, author, category, description } = req.body;

    await Book.updateBook(id, { title, author, category, description });

    res.redirect("/books");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  showCreateForm,
  createBook,
  showBook,
  deleteBook,
  showEditForm,
  updateBook,
};
