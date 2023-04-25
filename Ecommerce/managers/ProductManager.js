import fs from "fs";

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./productos.json";
  }

  getNextId() {
    return this.products.length + 1;
  }

  getProducts() {
    const productsList = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(productsList);
  }

  addProduct({ title, description, price, thumbnail, code, stock, category }) {
    if (!title || !description || !price || !code || !stock || !category) {
      throw new Error("Error: Faltan datos");
    }

    const fileData = fs.readFileSync(this.path, "utf-8");
    this.products = JSON.parse(fileData);

    const existingProduct = this.products.find(
      (product) => product.code === code
    );

    if (existingProduct) {
      throw new Error("Error: Código de producto ya existente");
    }

    const status = true;
    const product = {
      id: this.getNextId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
    };

    this.products.push(product);

    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));

    return product;
  }

  getProductById(id) {
    const productsList = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const product = productsList.find((product) => product.id === id);
    return product;
  }

  updateProduct(id, updatedFields) {
    const productsList = this.getProducts();
    const index = productsList.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error("Error: Producto no encontrado");
    }

    const productToUpdate = productsList[index];
    const updatedProduct = { ...productToUpdate, ...updatedFields };
    productsList[index] = updatedProduct;

    fs.writeFileSync(this.path, JSON.stringify(productsList, null, "\t"));

    return updatedProduct;
  }

  deleteProduct(id) {
    const productsList = this.getProducts();
    const index = productsList.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error("Error: Producto no encontrado");
    }

    const deletedProduct = productsList.splice(index, 1)[0];

    fs.writeFileSync(this.path, JSON.stringify(productsList, null, "\t"));

    return deletedProduct;
  }
}

/*const manager = new ProductManager();
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

const productUpdated = manager.updateProduct(1, {
  description: "actualizado",
});
console.log(productUpdated);

try {
  manager.deleteProduct(1);
} catch (error) {
  console.log(error.message);
}

try {
  manager.deleteProduct(2);
} catch (error) {
  console.log(error.message);
} */

export default ProductManager;
