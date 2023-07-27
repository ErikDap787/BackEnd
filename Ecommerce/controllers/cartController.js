import CartManager from "../../DAO/MongoDB-managers/CartManager.js";

const cart = new CartManager();

export const getCartsCtrl = async (req, res) => {
  try {
    const result = await cart.getCarts();
    if (result.error) {
      res.status(400).send(result);
    } else {
      console.log(result);
      res.render("carts", result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export const get1CartCtrl = async (req, res) => {
  const cid = req.params.cid;
  try {
    const result = await cart.getCartById(cid);
    if (result.error) {
      res.status(400).send(result);
    } else {
      console.log(result);
      res.render("cart", result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export const addCartCtrl = async (req, res) => {
  try {
    const result = await cart.addCart();
    if (result.error) {
      res.status(400).send(result);
    } else {
      res.status(201).send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export const addProdToCartCtrl = async (req, res) => {
  const newCartProduct = {
    cid: req.params.cid,
    pid: req.params.pid,
  };
  try {
    const result = await cart.addProduct(newCartProduct);
    if (result.error) {
      res.status(400).send(result);
    } else {
      res.status(201).send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteAllProdsFromCartCtrl = async (req, res) => {
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
};

export const delete1ProdFromCartCtrl = async (req, res) => {
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
};

export const update1ProdFromCartCtrl = async (req, res) => {
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
};

export const updateAllProdsFromCartCtrl = async (req, res) => {
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
};
