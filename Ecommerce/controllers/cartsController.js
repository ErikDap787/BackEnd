import CartManager from "../managers/CartManager.js";

const cartManager = new CartManager();

export const createCartController = async (req, res, next) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).send(cart);
  } catch (error) {
    next(error);
  }
};

export const getProductsFromCartController = async (req, res, next) => {
  try {
    const products = await cartManager.getProductsFromCart(+req.params.cid);
    res.send(products);
  } catch (error) {
    next(error);
  }
};

export const addProductToCartController = async (req, res, next) => {
  try {
    const message = await cartManager.addProductToCart(
      +req.params.cid,
      +req.params.pid
    );
    res.send(message);
  } catch (error) {
    next(error);
  }
};
