const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./productos.json";
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
  }

  getNextId() {
    return this.products.length + 1;
  }

  getProducts() {
    const productsList = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(productsList);
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Error: Faltan datos");
    }

    const existingProduct = this.products.find(
      (product) => product.code === code
    );

    if (existingProduct) {
      throw new Error("Error: Código de producto ya existente");
    }

    const id = this.getNextId();
    const product = { id, title, description, price, thumbnail, code, stock };
    this.products.push(product);

    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));

    return product;
  }

  getProductById(id) {
    const productsList = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const product = productsList.find((product) => product.id === id);
    if (!product) {
      throw new Error("Error: Producto no encontrado");
    }
    return product;
  }
}

const manager = new ProductManager();
console.log(manager.getProducts());

manager.addProduct({
  title: "producto prueba",
  description: "Este es un producto de prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});
console.log(manager.getProducts());

try {
  manager.addProduct({
    title: "producto prueba",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
} catch (error) {
  console.log(error.message);
}

try {
  const product = manager.getProductById(2);
  console.log(product);
} catch (error) {
  console.log(error.message);
}

const productFound = manager.getProductById(1);
console.log(productFound);
