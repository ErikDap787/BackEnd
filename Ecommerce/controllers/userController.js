import passport from "passport";
import userDto from "../DTO/userDTO";
import User from "../DAO/Models/userModel.js";
import { transporter } from "../utils.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

export const viewRegisterCtrl = (req, res) => {
  res.render("sessions/register");
};

export const passportRegisterCtrl = (req, res, next) => {
  passport.authenticate("register", {
    failureRedirect: "/failedRegister",
  })(req, res, () => {
    res.redirect("/login");
  });
};

export const failedRegisterCtrl = (req, res) => {
  res.send({ error: "El registro no se ha podido completar" });
};

export const viewLoginCtrl = (req, res) => {
  res.render("sessions/login");
};

export const passportLoginCtrl = (req, res, next) => {
  passport.authenticate("login", { failureRedirect: "/failedLogin" })(
    req,
    res,
    () => {
      if (!req.user) {
        return res
          .status(400)
          .send({ status: "error", error: "Las credenciales no son válidas" });
      }

      const user = new userDto(req.user);
      res.send(user);

      /* req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
      }; */

      res.redirect("/products");
    }
  );
};

export const failedLoginCtrl = (req, res) => {
  res.send({ error: "Error en el inicio de sesión" });
};

export const logoutCtrl = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send({ error: "No ha sido posible cerrar la sesión" });
    } else res.redirect("/login");
  });
};

export const profileCtrl = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send({ error: "No ha sido posible cerrar la sesión" });
    } else res.redirect("/login");
  });
};

export const githubCtrl = (req, res) => {
  passport.authenticate("github", { scope: ["user:email"] }), (req, res) => {};
};

export const githubCallbackCtrl = (req, res) => {
  passport.authenticate("github", { failureRedirect: "/login" }),
    async (req, res) => {
      req.session.user = req.user;
      res.redirect("/");
    };
};

export const getAllUsersCtrl = async (req, res) => {
  try {
    const users = await User.find();
    const userDtos = users.map((user) => new userDto(user));

    const simplifiedUsers = userDtos.map((userDto) => ({
      first_name: userDto.first_name,
      last_name: userDto.last_name,
      email: userDto.email,
      role: userDto.role,
    }));

    res.json(simplifiedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const deleteInactiveUsersCtrl = async (req, res) => {
  try {
    const inactivePeriod = 2 * 24 * 60 * 60 * 1000;

    const twoDaysAgo = new Date(Date.now() - inactivePeriod);

    const inactiveUsers = await User.find({
      lastConnectionDate: { $lt: twoDaysAgo },
    });

    for (const user of inactiveUsers) {
      const mailOptions = {
        from: GMAIL_USER,
        to: user.email,
        subject: "Notificación de eliminación de cuenta por inactividad",
        text: "Tu cuenta ha sido eliminada debido a la inactividad durante los últimos 2 días.",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error al enviar el correo electrónico:", error);
        } else {
          console.log("Correo electrónico enviado con éxito:", info.response);
        }
      });

      await User.findOneAndDelete({ _id: user._id });
    }

    res.json({
      message: "Usuarios inactivos eliminados y notificados con éxito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar usuarios inactivos" });
  }
};

export const updateUserRoleCtrl = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newRole = req.body.role;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { role: newRole } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Rol de usuario actualizado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el rol del usuario" });
  }
};

export const deleteUserCtrl = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findByIdAndRemove(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

export const adminAccess = (req, res, next) => {
  const user = req.user;

  if (user && user.role === "admin") {
    next();
  } else {
    res.render("error", {
      message: "Acceso denegado. Se requieren permisos de administrador.",
    });
  }
};
