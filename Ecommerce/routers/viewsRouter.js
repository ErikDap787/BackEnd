import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager();

const productsList = manager.getProducts();

router.get("/", (req, res) => res.render("home", { productsList }));

export default router;
