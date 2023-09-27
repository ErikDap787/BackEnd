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

router.get("/admin/users", adminAccess);

router.post("/admin/update-role/:userId", adminAccess, updateUserRoleCtrl);

router.delete("/admin/delete-user/:userId", adminAccess, deleteUserCtrl);

export default router;
