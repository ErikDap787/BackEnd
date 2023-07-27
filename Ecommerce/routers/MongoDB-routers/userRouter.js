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

export default router;
