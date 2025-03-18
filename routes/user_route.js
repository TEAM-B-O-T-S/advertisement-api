import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user_controller.js";

export const userRouter = Router();

userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);

//export router
export default userRouter;
