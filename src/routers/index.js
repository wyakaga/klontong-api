const { Router } = require("express");

const welcomeRouter = require("./welcome.router");
const authRouter = require("./auth.router");
const productRouter = require("./product.router");

const mainRouter = Router();

mainRouter.use("/", welcomeRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/products", productRouter);

module.exports = mainRouter;