import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: String,
        profilePic: {
            type: String,
            default: "/uploads/default.png"
        }
    },
    { timestamps: true }
);

export default userSchema;