import mongoose from "mongoose";
import cartSchema from "../schemas/cart.schema.js";

const CartItemModel = mongoose.model("CartItem", cartSchema);
export default CartItemModel;