import { Router } from "express";
import {
  getProductByIdController,
  getProductsController,
  addProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productsController.js";

const router = Router();

// GET  /api/products[?:limit=N]
router.get("/", getProductsController);

// GET 	/api/products/:pid
router.get("/:pid", getProductByIdController);

// POST /api/products
router.post("/", addProductController);

// PUT /api/products/:pid
router.put("/:pid", updateProductController);

// DELETE /api/products/:pid
router.delete("/:pid", deleteProductController);

export default router;
