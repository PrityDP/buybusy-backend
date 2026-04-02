import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    category: { type: String, default: "General" },
    image: String,
    description: String
});

export default productSchema;