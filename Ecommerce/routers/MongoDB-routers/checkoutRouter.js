import { Router } from "express";
import {
  showCheckoutPageCtrl,
  processOrderCtrl,
} from "../../controllers/checkoutController.js";

const router = Router();

router.get("/", showCheckoutPageCtrl);

router.post("/process-order", processOrderCtrl);

export default router;
