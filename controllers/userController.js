const User = require("../models/User.js");

const getUsersPage = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();

    res.render("users/index", {
      pageTitle: "Gestión de usuarios",
      users,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};

const changeRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (String(req.user.id) === String(id)) {
      const users = await User.getAllUsers();

      return res.status(403).render("users/index", {
        pageTitle: "Gestión de usuarios",
        users,
        message: "No puedes modificar tu propio rol.",
      });
    }

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).send("El rol seleccionado no es válido.");
    }

    const updatedUser = await User.updateUserRole(id, role);

    if (!updatedUser) {
      return res.status(404).send("Usuario no encontrado.");
    }

    res.redirect("/users/admin");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsersPage,
  changeRole,
};