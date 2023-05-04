import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager();

const productsList = manager.getProducts();

router.get("/", (req, res) => {
  res.render("realTimeProducts", { productsList });
});

router.post("/", (req, res) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.price ||
    !req.body.stock ||
    !req.body.category ||
    !req.body.code
  ) {
    res.status(206).send("Faltan datos");
    console.log(req.body);
  } else {
    manager.addProduct(req.body);
    const updatedProductsList = manager.getProducts();
    res.render("realTimeProducts", { productsList: updatedProductsList });
  }
});

export default router;
