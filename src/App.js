import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const manager = new ProductManager();

app.use(express.json());

app.get("/products", async (req, res) => {
  let limit = req.query.limit;
  let productsList = await manager.getProducts();
  let response = {};
  if (limit) {
    response.productsList = productsList.slice(0, +limit);
  } else {
    response.productsList = productsList;
  }

  res.send(response);
});

app.get("/products/:pid", async (req, res) => {
  let productSearch = req.params.pid;
  let productFound = await manager.getProductById(+productSearch);
  if (productFound) {
    res.send(productFound);
  } else {
    res.status(404).send("Error: El producto no existe");
  }
});

app.listen(8080, () => console.log("Server listening"));
