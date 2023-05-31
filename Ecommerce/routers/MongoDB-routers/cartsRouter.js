import { Router } from "express";
import CartManager from "../DAO/MongoDB-managers/CartManager.js";

const router = Router();
const cart = new CartManager();

router.get("/", async (req, res) => {
  try {
    const result = await cart.getCarts();
    res.status(400).render("carts", result);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const result = await cart.getCartById(cid);
    if (result.error) {
      res.status(400).send(result);
    } else {
      res.status(201).send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const result = await cart.addCart();

    res.status(400).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/:cid/product/:pid", async (req, res) => {
  const newCartProduct = {
    cid: req.params.cid,
    pid: req.params.pid,
  };
  try {
    const result = await cart.addProduct(newCartProduct);

    res.status(400).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const result = await cart.deleteAllProducts(cid);
    if (result.error) {
      res.status(400).send(result);
    } else {
      res.status(201).send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
router.delete("/:cid/product/:pid", async (req, res) => {
  const deleteCartProduct = {
    cid: req.params.cid,
    pid: req.params.pid,
  };
  try {
    const result = await cart.deleteProduct(deleteCartProduct);
    if (result.error) {
      res.status(400).send(result);
    } else {
      res.status(201).send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
router.put("/:cid/product/:pid", async (req, res) => {
  const updateProduct = {
    cid: req.params.cid,
    pid: req.params.pid,
    qty: req.body.qty,
  };
  console.log(updateProduct);
  try {
    const result = await cart.updateProductQty(updateProduct);
    if (result.error) {
      res.status(400).send(result);
    } else {
      res.status(201).send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
router.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const products = req.body;
  console.log(cid, products);
  try {
    const result = await cart.updateAllProducts(cid, products);
    if (result.error) {
      res.status(400).send(result);
    } else {
      res.status(201).send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
export default router;
