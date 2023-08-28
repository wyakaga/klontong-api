const { Router } = require("express");

const productController = require("../controllers/product.controller");
const memoryUpload = require("../middlewares/memoryUpload");
const { isSignedIn, checkRole } = require("../middlewares/auth");

const productRouter = Router();

productRouter.get("/", productController.getAll);
productRouter.get("/:id", isSignedIn, productController.getDetail);
productRouter.post("/", isSignedIn, checkRole, memoryUpload.single("image"), productController.addProduct)

module.exports = productRouter;