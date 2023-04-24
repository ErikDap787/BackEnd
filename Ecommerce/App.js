import express from "express";
import productsRouter from "./routers/productsRouter.js";
import cartsRouter from "./routers/cartsRouter.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use((error, req, res, next) => {
  console.error(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Ocurrió un error";
  res.status(statusCode).json({ message });
});

app.listen(8080, () => console.log("Server listening"));
