import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.js";
import productRouter from "./routers/MongoDB-routers/productRouter.js";
import cartRouter from "./routers/MongoDB-routers/cartRouter.js";
import cartsRouter from "./routers/MongoDB-routers/cartsRouter.js";
import productsRouter from "./routers/MongoDB-routers/productsRouter.js";
import userRouter from "./routers/MongoDB-routers/userRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URL;

const app = express();

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: uri,
      dbName: "sessions",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 120,
    }),
    secret: process.env.PRIVATE_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());

app.use("/", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/carts", cartsRouter);
app.use("/products", productsRouter);
/*app.use("/jwt", jwtRouter) 
  app.use(cookieParser())
  
  CONFIGURAR NEXT STEP*/

try {
  await mongoose.connect(uri, { dbName: "Ecommerce" });
  console.log("DB connected");
  app.listen(8080, () => {
    console.log("Server listening");
  });
} catch (error) {
  console.log(error);
}
