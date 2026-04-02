import mongoose from "mongoose";
import productSchema from "../schemas/product.schema.js";

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;