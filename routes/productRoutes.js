import express from "express";
import ProductController from "../controllers/productController.js";
import { jwtAuth } from "../middlewares/jwtAuth.middleware.js";

const productRouter = express.Router();

const productController = new ProductController();


productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", jwtAuth, productController.addProduct);
productRouter.put("/:id", jwtAuth, productController.updateProduct);
productRouter.delete("/:id", jwtAuth, productController.deleteProduct);

export default productRouter;