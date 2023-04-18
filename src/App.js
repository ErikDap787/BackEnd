import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const manager = new ProductManager();

app.use(express.json());

app.get("/products", (req, res) => {
  let limit = req.query.limit;
  let productsList = manager.getProducts();
  let response = {};
  if (limit) {
    response.productsList = productsList.slice(0, +limit);
  } else {
    response.productsList = productsList;
  }

  res.send(response);
});

app.get("/products/:pid", (req, res) => {
  let productSearch = req.params.pid;
  let productFound = manager.getProductById(+productSearch);
  res.send(productFound);
});

app.listen(8080, () => console.log("Server listening"));
