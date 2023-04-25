import ProductManager from "../managers/ProductManager.js";

const manager = new ProductManager();

export const getProductsController = async (req, res, next) => {
  try {
    const limit = req.query.limit;
    const productsList = await manager.getProducts();
    if (limit) {
      productsList = res.send(productsList.slice(0, +limit));
    } else {
      res.send(productsList);
    }
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (req, res, next) => {
  try {
    const productSearch = req.params.pid;
    const productFound = await manager.getProductById(+productSearch);
    if (productFound) {
      res.send(productFound);
    } else {
      const error = new Error("El producto no existe");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const addProductController = async (req, res, next) => {
  try {
    const product = req.body;
    const productAdded = await manager.addProduct(product);
    res.status(201).send("Producto anadido exitosamente");
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const product = req.body;
    const productUpdated = await manager.updateProduct(
      +req.params.pid,
      product
    );
    res.status(200).send("Producto actualizado exitosamente");
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (req, res, next) => {
  try {
    const productDeleted = await manager.deleteProduct(+req.params.pid);
    res.status(202).send("Producto eliminado exitosamente");
  } catch (error) {
    next(error);
  }
};
