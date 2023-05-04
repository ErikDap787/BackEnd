import express from "express";
import productsRouter from "./routers/productsRouter.js";
import cartsRouter from "./routers/cartsRouter.js";
import viewsRouter from "./routers/viewsRouter.js";
import realTimeProdRouter from "./routers/realTimeProdRouter.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";

const app = express();

app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/realtimeproducts", realTimeProdRouter);
app.use("/", viewsRouter);

app.use((error, req, res, next) => {
  console.error(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Ocurrió un error";
  res.status(statusCode).json({ message });
});

const httpServer = app.listen(8080, () => console.log("Server listening"));

const socketServer = new Server(httpServer);

socketServer.on("connection", (socketClient) => {
  console.log("Un nuevo usuario se ha conectado");
  socketClient.on("productsList", (productsList) => {
    socketServer.emit(productsList);
  });
});
