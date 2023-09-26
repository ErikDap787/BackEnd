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
import dotenv from "dotenv";
import compression from "express-compression";
import swaggerUiExpress from "swagger-ui-express";
import swaggerjsdoc from "swagger-jsdoc";

dotenv.config();

const uri = "mongodb+srv://erikdapczuk:13579ead@ecommerce.95xtgye.mongodb.net";

/*Por alguna razon, no logro conectarme a MongoDB cuando uso la variable de entorno, solo si uso aqui directamente la direccion*/

/*"mongodb+srv://erikdapczuk:13579ead@ecommerce.95xtgye.mongodb.net";*/

/*"mongodb://localhost:27017/Ecommerce"; /*process.env.MONGO_URL*/

console.log(uri);

/*console.log(process.env.MONGO_URL);*/

const app = express();

app.use(compression({ brotli: { enabled: true, zlib: {} } }));

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

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce API",
      description: "Ecommerce venta de productos de indumentaria",
    },
  },

  apis: ["./docs/**/*.yaml"],
};

const specs = swaggerjsdoc(swaggerOptions);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());

app.use("/", userRouter);
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/carts", cartsRouter);
app.use("/products", productsRouter);
app.use("/api/users", userRouter);

try {
  await mongoose.connect(uri, { dbName: "Ecommerce" });
  console.log("DB connected");

  const port = process.env.PORT || 3000;

  app.listen(port, "0.0.0.0", () => {
    console.log("Server listening");
  });
} catch (error) {
  console.log(error);
}
