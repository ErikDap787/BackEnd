import { Router } from "express";
import {
  getProductsCtrl,
  getProductByIdCtrl,
} from "../../controllers/productController.js";

const router = Router();

router.get("/", getProductsCtrl);

router.get("/:id", getProductByIdCtrl);

export default router;
