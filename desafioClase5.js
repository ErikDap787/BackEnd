class ProductManager {
  constructor() {
    this.products = [];
  }

  getNextId() {
    return this.products.length + 1;
  }

  getProducts() {
    return this.products;
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

    return product;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
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
