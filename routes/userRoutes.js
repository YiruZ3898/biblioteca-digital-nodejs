const express = require("express");
const verifyToken = require("../middlewares/auth");
const isAdmin = require("../middlewares/admin");
const {
  getUsersPage,
  changeRole,
} = require("../controllers/userController");

const router = express.Router();

router.get("/admin", verifyToken, isAdmin, getUsersPage);
router.post("/role/:id", verifyToken, isAdmin, changeRole);

module.exports = router;