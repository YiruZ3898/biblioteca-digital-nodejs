require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");


const bookRoutes = require("./routes/bookRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const loanRoutes = require("./routes/loanRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const verifyToken = require("./middlewares/auth.js");
const isAdmin = require("./middlewares/admin.js");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main.ejs");
app.use(cookieParser());


const jwt = require("jsonwebtoken");

app.use((req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      res.locals.user = user;
    } catch {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }

  next();
});

app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.render("home", { pageTitle: "Biblioteca Digital" });
});

app.use("/books", bookRoutes);

app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected route",
    user: req.user,
  });
});

app.use("/loans", loanRoutes);

app.use("/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Página no encontrada");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});