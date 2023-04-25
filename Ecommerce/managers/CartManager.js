import fs from "fs";

class CartManager {
  constructor() {
    this.carts = [];
    this.path = "./carritos.json";
  }

  getNextId() {
    return this.carts.length + 1;
  }

  createCart() {
    const id = this.getNextId();
    const newCart = {
      id: id,
      products: [],
    };

    this.carts.push(newCart);
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, "\t"));

    return newCart;
  }

  getProductsFromCart(cid) {
    const productsInCart = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const cart = productsInCart.find((cart) => cart.id === cid);
    if (cart) {
      return cart.products;
    } else {
      throw new Error("Carrito no encontrado");
    }
  }

  addProductToCart(cid, pid) {
    const productsInCart = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const cart = productsInCart.find((cart) => cart.id === cid);
    if (cart) {
      const existingProduct = cart.products.find(
        (prod) => prod.product === pid
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }
      fs.writeFileSync(this.path, JSON.stringify(productsInCart, null, "\t"));
      return { message: "Producto agregado al carrito" };
    } else {
      throw new Error("Carrito no encontrado");
    }
  }
}

export default CartManager;
