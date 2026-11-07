const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const showRegisterForm = (req, res) => {
  res.render("auth/register", { pageTitle: "Registrarse" });
};

const showLoginForm = (req, res) => {
  res.render("auth/login", { pageTitle: "Iniciar sesión" });
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.createUser({
      username,
      email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).send("Credenciales inválidas");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Credenciales inválidas");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.redirect("/books");
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");

  res.redirect("/login");
};

module.exports = {
  showRegisterForm,
  showLoginForm,
  register,
  login,
  logout,
};
