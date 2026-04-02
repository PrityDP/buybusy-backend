import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";   // ✅ NEW
import helmet from "helmet";
import morgan from "morgan";
import connectMongooseDB from './config/mongoConfig.js';
import cartRouter from "./routes/cartRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import { apiLimiter } from "./config/rateLimiter.js";

dotenv.config();
connectMongooseDB();

//Instantiate server
const app = express();

// helmet  Helmet is a security middleware for Express app. It helps protect your app from common web attacks.
// It automatically sets HTTP security headers
// Example headers: - 
// Header - X-XSS-Protection Purpose - Prevent XSS attacks
// Header - Strict-Transport-Security Purpose - Force HTTPS

// morgan - Morgan is a logging middleware. It logs every request coming to your server
// It prints logs like: GET /api/products 200 15ms
// Why it is useful? - Use Case	- Debugging  Benefit - See API calls


// Security middleware
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
); // security
app.use(morgan("dev")); // logging 

// Rate limiter
app.use("/api", apiLimiter);

// Allow cross orogin access CORS (IMPORTANT for cookies)
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true   // 🔥 REQUIRED
}));

// Body parser
app.use(express.json()); // express.json() = “Convert incoming JSON request data into usable JavaScript object
// Cookies
app.use(cookieParser()); // ✅ REQUIRED

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Serve uploaded images Static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});
app.listen(process.env.PORT, () =>
    console.log(`Server running on ${process.env.PORT}`)
);