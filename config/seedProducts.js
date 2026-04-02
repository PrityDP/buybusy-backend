import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "../models/productModel.js";

dotenv.config();

// Define products array
const products = [
    {
        title: "Apple iPhone 15 (128GB)",
        price: 79999,
        category: "Electronics",
        image: "/uploads/iphone15.jpg",
        description: "Latest Apple iPhone 15 with A16 Bionic chip and advanced camera system."
    },
    {
        title: "Samsung 55-inch 4K Smart TV",
        price: 54999,
        category: "Electronics",
        image: "/uploads/samsung_tv.jpg",
        description: "Ultra HD Smart LED TV with Netflix, Prime Video and voice assistant."
    },
    {
        title: "Nike Air Max Running Shoes",
        price: 3999,
        category: "Fashion",
        image: "/uploads/nike_shoes.jpg",
        description: "Comfortable and stylish running shoes for daily wear."
    },
    {
        title: "Dell Inspiron 15 Laptop (i5, 16GB RAM)",
        price: 64999,
        category: "Electronics",
        image: "/uploads/dell_laptop.jpg",
        description: "Powerful laptop for coding, gaming, and productivity."
    },
    {
        title: "boAt Rockerz 450 Headphones",
        price: 1499,
        category: "Electronics",
        image: "/uploads/boat_headphones.jpg",
        description: "Wireless Bluetooth headphones with deep bass and long battery."
    },
    {
        title: "Men's Cotton T-Shirt",
        price: 599,
        category: "Fashion",
        image: "/uploads/tshirt.jpg",
        description: "Comfortable cotton t-shirt available in multiple colors."
    },
    {
        title: "Fastrack Analog Watch",
        price: 1299,
        category: "Accessories",
        image: "/uploads/fastrack_watch.jpg",
        description: "Stylish watch for casual and formal wear."
    },
    {
        title: "American Tourister Backpack",
        price: 1999,
        category: "Accessories",
        image: "/uploads/backpack.jpg",
        description: "Durable backpack suitable for travel and daily use."
    },
    {
        title: "Logitech G102 Gaming Mouse",
        price: 1495,
        category: "Electronics",
        image: "/uploads/gaming_mouse.jpg",
        description: "High-performance gaming mouse with RGB lighting."
    },
    {
        title: "Redragon Mechanical Keyboard",
        price: 3499,
        category: "Electronics",
        image: "/uploads/mechanical_keyboard.jpg",
        description: "RGB mechanical keyboard perfect for gamers and developers."
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Clear existing products
        await ProductModel.deleteMany();

        // Insert new ones
        await ProductModel.insertMany(products);

        console.log("10 Amazon-like products seeded successfully");
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
};

seedProducts();