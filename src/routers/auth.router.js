const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const { isSignedIn } = require("../middlewares/auth");

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.delete("/logout", isSignedIn, authController.logout);

module.exports = authRouter;