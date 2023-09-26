import passport from "passport";
import userDto from "../DTO/userDTO";
import User from "../DAO/Models/userModel.js";
import { transporter } from "../utils.js";
import dotenv from "dotenv";

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
    // Define el período de inactividad (2 días en milisegundos)
    const inactivePeriod = 2 * 24 * 60 * 60 * 1000;

    // Calcula la fecha límite para la inactividad (hace 2 días)
    const twoDaysAgo = new Date(Date.now() - inactivePeriod);

    // Encuentra usuarios inactivos
    const inactiveUsers = await User.find({
      lastConnectionDate: { $lt: twoDaysAgo },
    });

    // Itera sobre usuarios inactivos y envía correos de notificación
    for (const user of inactiveUsers) {
      const mailOptions = {
        from: GMAIL_USER, // Tu dirección de correo electrónico
        to: user.email, // Correo electrónico del destinatario
        subject: "Notificación de eliminación de cuenta por inactividad",
        text: "Tu cuenta ha sido eliminada debido a la inactividad durante los últimos 2 días.",
      };

      // Envía el correo electrónico utilizando el transporte de correo configurado
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error al enviar el correo electrónico:", error);
        } else {
          console.log("Correo electrónico enviado con éxito:", info.response);
        }
      });

      // Elimina el usuario inactivo por su ID
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

// ... Importaciones y configuración de nodemailer y User model como se hizo antes ...

export const updateUserRoleCtrl = async (req, res) => {
  try {
    const userId = req.params.userId; // Obtén el ID del usuario cuyo rol deseas actualizar
    const newRole = req.body.role; // Supongamos que envías el nuevo rol en el cuerpo de la solicitud

    // Realiza la lógica para actualizar el rol del usuario por su ID (usando Mongoose u otro ORM)
    // ...

    res.json({ message: "Rol de usuario actualizado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el rol del usuario" });
  }
};

export const deleteUserCtrl = async (req, res) => {
  try {
    const userId = req.params.userId; // Obtén el ID del usuario a eliminar

    // Realiza la lógica para eliminar al usuario por su ID (usando Mongoose u otro ORM)
    // ...

    res.render("success", { message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.render("error", { message: "Error al eliminar el usuario" });
  }
};

export const adminAccess = (req, res, next) => {
  // Supongamos que tienes información del usuario autenticado en req.user
  const user = req.user; // Asumiendo que tienes un objeto de usuario con un campo 'role'

  if (user && user.role === "admin") {
    next(); // El usuario tiene permisos de administrador, continuar
  } else {
    res.render("error", {
      message: "Acceso denegado. Se requieren permisos de administrador.",
    });
  }
};
