import express from "express";
import CartController from "../controllers/cartController.js";
import { jwtAuth } from "../middlewares/jwtAuth.middleware.js";


const cartRouter = express.Router();

const cartController = new CartController();

cartRouter.get("/", jwtAuth, cartController.getCart);
cartRouter.post("/", jwtAuth, cartController.addToCart);
cartRouter.delete("/:productId", jwtAuth, cartController.removeFromCart);
cartRouter.put("/:productId", jwtAuth, cartController.updateCart);

export default cartRouter;