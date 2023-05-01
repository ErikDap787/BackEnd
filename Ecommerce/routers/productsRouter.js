import { Router } from "express";
import {
  getProductByIdController,
  getProductsController,
  addProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productsController.js";

const router = Router();

router.get("/", getProductsController);

router.get("/:pid", getProductByIdController);

router.post("/", addProductController);

router.put("/:pid", updateProductController);

router.delete("/:pid", deleteProductController);

export default router;
