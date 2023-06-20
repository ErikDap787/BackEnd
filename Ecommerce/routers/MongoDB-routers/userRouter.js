import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/register", (req, res) => {
  res.render("sessions/register");
});

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/failedRegister",
  }),
  async (req, res) => {
    res.redirect("/login");
  }
);

router.get("/failedRegister", (req, res) => {
  res.send({ error: "El registro no se ha podido completar" });
});

router.get("/login", (req, res) => {
  res.render("sessions/login");
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failedLogin" }),
  async (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .send({ status: "error", error: "Las credenciales no son válidas" });
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
    };

    res.redirect("/products");
  }
);

router.get("/failedLogin", (req, res) => {
  res.send({ error: "Error en el inicio de sesión" });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send({ error: "No ha sido posible cerrar la sesión" });
    } else res.redirect("/login");
  });
});

router.get("/profile", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send({ error: "No ha sido posible cerrar la sesión" });
    } else res.redirect("/login");
  });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

export default router;
