class ProductManager {
  constructor() {
    this.products = [];
  }

  generateID() {
    if (this.products.length === 0) return 1;
    return this.products[this.products.length - 1].id + 1;
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const existingProduct = this.products.find(
      (product) => product.code === code
    );

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Error: Faltan datos");
    } else if (existingProduct) {
      throw new Error("Error: Código de producto ya existente");
    } else {
      const id = this.generateID();
      const product = { id, title, description, price, thumbnail, code, stock };
      this.products.push(product);
      return product;
    }
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new Error("Error: Producto no encontrado");
    return product;
  }
}

const manager = new ProductManager();
console.log(manager.getProducts());

manager.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
console.log(manager.getProducts());

try {
  manager.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
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
