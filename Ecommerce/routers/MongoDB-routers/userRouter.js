import { Router } from "express";
import {
  viewRegisterCtrl,
  passportRegisterCtrl,
  failedRegisterCtrl,
  viewLoginCtrl,
  passportLoginCtrl,
  failedLoginCtrl,
  logoutCtrl,
  profileCtrl,
  githubCtrl,
  githubCallbackCtrl,
  getAllUsersCtrl,
  deleteInactiveUsersCtrl,
  adminAccess,
  updateUserRoleCtrl,
  deleteUserCtrl,
} from "../../controllers/userController.js";

const router = Router();

router.get("/register", viewRegisterCtrl);

router.post("/register", passportRegisterCtrl);

router.get("/failedRegister", failedRegisterCtrl);

router.get("/login", viewLoginCtrl);

router.post("/login", passportLoginCtrl);

router.get("/failedLogin", failedLoginCtrl);

router.get("/logout", logoutCtrl);

router.get("/profile", profileCtrl);

router.get("/github", githubCtrl);

router.get("/githubcallback", githubCallbackCtrl);

router.get("/getAllUsers", getAllUsersCtrl);

router.delete("/delete-inactive", deleteInactiveUsersCtrl);

// Ruta para acceder a la vista de administración de usuarios
router.get("/admin/users", adminAccess, (req, res) => {
  // Aquí renderiza la vista de administración de usuarios (por ejemplo, con un motor de plantillas como EJS o Pug)
  res.render("admin/users");
});

// Ruta para actualizar el rol de un usuario
router.post("/admin/update-role/:userId", adminAccess, updateUserRoleCtrl);

// Ruta para eliminar un usuario
router.delete("/admin/delete-user/:userId", adminAccess, deleteUserCtrl);

export default router;
