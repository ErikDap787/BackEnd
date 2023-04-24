import { Router } from "express";

import {
  getProductsFromCartController,
  createCartController,
  addProductToCartController,
} from "../controllers/cartsController.js";

const router = Router();

// GET /api/carts/:cid
router.get("/:cid", getProductsFromCartController);

//POST /api/carts/
router.post("/", createCartController);

//POST /api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", addProductToCartController);

export default router;
