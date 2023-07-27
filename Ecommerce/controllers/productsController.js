import ProductManager from "../DAO/MongoDB-managers/ProductManager.js";

const prod = new ProductManager();

export const getProductsCtrl = async (req, res) => {
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
};

export const viewCreateProductsCtrl = async (req, res) => {
  res.render("create");
};

export const createProductsCtrl = async (req, res) => {
  const product = req.body;
  try {
    const result = await manager.createProduct(product);
  } catch (err) {
    res.status(400).send(err);
  }
  res.redirect("/api/products");
};

export const deleteProductsCtrl = async (req, res) => {
  manager.deleteProduct(req.params.id);
  res.send("Se ha eliminado el producto correctamente");
};

export const viewAllProductsCtrl = async (req, res) => {
  if (req.session.user) {
    return res.render("products");
  } else {
    res.redirect("/login");
  }
};
