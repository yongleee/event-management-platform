import express from "express";
import authController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.route("/login").post(authController.loginUser);

export default authRouter;
