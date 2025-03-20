import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user_controller.js";

export const userRouter = Router();

userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);
userRouter.patch("/users/:id", updateUser);

//export router
export default userRouter;
