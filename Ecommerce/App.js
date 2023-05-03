import express from "express";
import productsRouter from "./routers/productsRouter.js";
import cartsRouter from "./routers/cartsRouter.js";
import viewsRouter from "./routers/viewsRouter.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/realTimeProducts", viewsRouter);

app.use((error, req, res, next) => {
  console.error(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Ocurrió un error";
  res.status(statusCode).json({ message });
});

app.listen(8080, () => console.log("Server listening"));
