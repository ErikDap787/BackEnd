import { Router } from "express";
import ProductManager from "../../DAO/MongoDB-managers/ProductManager.js";

const router = Router();

const manager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const productos = await manager.getProducts(
      req.query.limit,
      req.query.page,
      req.query.query,
      req.query.sort
    );
    console.log(productos);
    res.status(200).render("products", productos);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/create", async (req, res) => {
  res.render("create");
});

router.post("/", async (req, res) => {
  const product = req.body;
  try {
    const result = await manager.createProduct(product);
  } catch (err) {
    res.status(400).send(err);
  }
  res.redirect("/api/products");
});

router.delete("/delete/:id", async (req, res) => {
  manager.deleteProduct(req.params.id);
  res.send("Se ha eliminado el producto correctamente");
});

router.get("/products", (req, res) => {
  if (req.session.user) {
    return res.render("products");
  } else {
    res.redirect("/login");
  }
});

export default router;
