import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import productRouter from "./routers/MongoDB-routers/productRouter.js";
import cartRouter from "./routers/MongoDB-routers/cartRouter.js";
import cartsRouter from "./routers/MongoDB-routers/cartsRouter.js";
import productsRouter from "./routers/MongoDB-routers/productsRouter.js";

const url =
  "mongodb+srv://erikdapczuk: 123456789EAD@ecommercecluster.qmctabo.mongodb.net/Ecommerce";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/carts", cartsRouter);
app.use("/products", productsRouter);

try {
  await mongoose.connect(url, { dbName: "Ecommerce" });
  console.log("DB conected");
  app.listen(8080, () => {
    console.log("Server listening");
  });
} catch (error) {
  console.log(error);
}
