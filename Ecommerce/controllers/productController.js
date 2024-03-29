import ProductManager from "../DAO/MongoDB-managers/ProductManager.js";

const prod = new ProductManager();

export const getProductsCtrl = async (req, res) => {
  let { limit, page, query, sort } = req.query;
  try {
    const productos = await prod.getProducts(limit, page, query, sort);
    res.render("products", productos);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getProductByIdCtrl = async (req, res) => {
  let id = req.params.id;
  try {
    const foundprod = await prod.getProductById(id);
    console.log(foundprod);
    res.render("product", foundprod);
  } catch (error) {
    res.status(404).send({
      error: "Producto no encontrado",
      servererror: error,
    });
  }
};
