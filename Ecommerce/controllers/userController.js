import passport from "passport";

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
