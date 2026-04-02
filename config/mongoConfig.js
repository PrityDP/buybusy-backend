// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/buybusy";
        await mongoose.connect(process.env.MONGO_URI, {
            // no need to set options for mongoose v6+
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

export default connectDB;
