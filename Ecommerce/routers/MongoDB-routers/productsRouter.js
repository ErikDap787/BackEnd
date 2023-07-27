import { Router } from "express";
import {
  getProductsCtrl,
  createProductsCtrl,
  viewCreateProductsCtrl,
  deleteProductsCtrl,
  viewAllProductsCtrl,
} from "../../controllers/productsController.js";

const router = Router();

router.get("/", getProductsCtrl);

router.get("/create", viewCreateProductsCtrl);

router.post("/", createProductsCtrl);

router.delete("/delete/:id", deleteProductsCtrl);

router.get("/products", viewAllProductsCtrl);

export default router;
