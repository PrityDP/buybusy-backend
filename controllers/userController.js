// controllers/userController.js
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import upload from "../middlewares/fileupload.middleware.js";

class UserController {

    // Generate token method
    generateToken = (res, user) => {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
    };

    // Register User 
    register = async (req, res) => {
        const { name, email, password } = req.body;

        const userExists = await UserModel.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await UserModel.create({ name, email, password: hashed });

        this.generateToken(res, user);

        res.json(user);
    };

    // Login user
    login = async (req, res) => {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        this.generateToken(res, user);

        return res.status(200).json({ msg: "Login successful", user: user });
    };

    // Logout user 
    logout = (req, res) => {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out" });
    };

    // Get current user after login
    getCurrentUser = async (req, res) => {
        try {
            const user = await UserModel.findById(req.user.id).select("-password");
            res.json({ user });
        } catch (error) {
            res.status(500).json({ message: "Error fetching user" });
        }
    };


    // Upload avatar
    uploadAvatar = async (req, res) => {
        try {
            const user = await UserModel.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // multer gives file info
            user.profilePic = `/uploads/${req.file.filename}`;

            await user.save();

            res.json({
                message: "Profile image updated",
                user
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default UserController;