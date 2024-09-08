import express from "express";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/signup").post(userController.createNewUser);

export default userRouter;
