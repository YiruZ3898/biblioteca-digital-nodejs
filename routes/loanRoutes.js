const express = require("express");
const isAdmin = require("../middlewares/admin.js");

const router = express.Router();

const verifyToken = require("../middlewares/auth.js");

const { requestLoan, getMyLoans,
        getAllLoans,approveLoan,
        returnLoan

 } = require("../controllers/loanController");

router.post("/request/:bookId", verifyToken, requestLoan);

router.get("/my-loans", verifyToken, getMyLoans);

router.get("/admin", verifyToken, isAdmin, getAllLoans);

router.post("/approve/:id", verifyToken, isAdmin, approveLoan);

router.post("/return/:id", verifyToken, isAdmin, returnLoan);

module.exports = router;
