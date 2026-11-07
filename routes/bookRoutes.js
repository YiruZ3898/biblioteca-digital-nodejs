const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/admin.js");
const verifyToken = require("../middlewares/auth.js");

const {
  getAllBooks,
  showCreateForm,
  createBook,
  showBook,
  deleteBook,
  showEditForm,
  updateBook,
  
} = require("../controllers/bookController");

router.get("/", getAllBooks);

router.get("/new", verifyToken, isAdmin, showCreateForm);

router.post("/", verifyToken, isAdmin, createBook);

router.get("/:id/delete", verifyToken, isAdmin, deleteBook);

router.get("/:id/edit", verifyToken, isAdmin, showEditForm);

router.post("/:id/edit", verifyToken, isAdmin, updateBook);

router.get("/:id", showBook);

module.exports = router;
