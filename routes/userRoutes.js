import express from "express";
import UserController from "../controllers/userController.js";
import { jwtAuth } from "../middlewares/jwtAuth.middleware.js";
import upload from "../middlewares/fileupload.middleware.js";

const userRouter = express.Router();

// Instantiate UserController
const userController = new UserController();

// Routes
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/currentUser", jwtAuth, userController.getCurrentUser);
userRouter.post("/uploadProfilePic", jwtAuth, upload.single("profilePic"), userController.uploadProfilePic
);

export default userRouter;
